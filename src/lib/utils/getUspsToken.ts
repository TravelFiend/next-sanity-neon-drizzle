import 'server-only';
import { redis } from '@/redis/redis';
import { tokenSchema, type TokenResponse } from '@/lib/zod/oAuthZod';

type GrantType = 'client_credentials' | 'refresh_token';

const REDIS_USPS_ACCESS_TOKEN_KEY = 'usps_access_token';
const TTL_BUFFER_SECONDS = 120;

let USPS_TOKEN_URL;
if (process.env.NODE_ENV === 'development') {
  USPS_TOKEN_URL = 'https://apis-tem.usps.com/oauth2/v3/token';
} else {
  USPS_TOKEN_URL = 'https://apis.usps.com/oauth2/v3/token';
}

const fetchAndCacheTokens = async (
  grantType: GrantType,
  refreshToken?: string
) => {
  if (!USPS_TOKEN_URL)
    throw new Error('USPS_TOKEN_URL not set in environemnt variables');

  const clientId = process.env.USPS_CLIENT_ID;
  const clientSecret = process.env.USPS_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    throw new Error('USPS credentials not found in environment variables');
  }

  const body = new URLSearchParams({
    grant_type: grantType,
    client_id: clientId,
    client_secret: clientSecret,
    scope: 'addresses'
  });

  if (refreshToken && grantType === 'refresh_token') {
    body.append('refresh_token', refreshToken);
  }

  const tokenRes = await fetch(USPS_TOKEN_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body.toString(),
    cache: 'no-store'
  });

  if (!tokenRes.ok) {
    const errorBody = await tokenRes.json().catch(() => ({}));
    const errorMessage = `Failed to get/refresh USPS token via ${grantType}. Status: ${tokenRes.status}. Error: ${JSON.stringify(errorBody)}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  const data = (await tokenRes.json()) as TokenResponse;
  const parsedToken = tokenSchema.safeParse(data);
  const { success, data: tokenResponse } = parsedToken;

  if (!success) throw new Error('Invalid token response.');
  const accessTTL = Math.max(1, tokenResponse.expires_in! - TTL_BUFFER_SECONDS);

  await redis.set(REDIS_USPS_ACCESS_TOKEN_KEY, tokenResponse.access_token, {
    ex: accessTTL
  });
  return tokenResponse.access_token;
};

const getValidUspsToken = async () => {
  const uspsToken = await redis.get(REDIS_USPS_ACCESS_TOKEN_KEY);
  const uspsTokenExpiry = await redis.ttl(REDIS_USPS_ACCESS_TOKEN_KEY);

  if (!uspsToken && uspsTokenExpiry > TTL_BUFFER_SECONDS) return uspsToken;
  return await fetchAndCacheTokens('client_credentials');
};

export default getValidUspsToken;
