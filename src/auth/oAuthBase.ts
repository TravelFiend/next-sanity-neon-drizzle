import { randomHexString, sha256Base64Url } from '@/lib/utils/cryptoFunctions';
import { cookies } from 'next/headers';
import { z } from 'zod/v4';

const STATE_COOKIE_KEY = 'oAuthState';
const CODE_VERIFIER_COOKIE_KEY = 'oAuthCodeVerifier';
const COOKIE_EXPIRATION_SECONDS = 60 * 10; // 10 minutes

const createState = async () => {
  const state = randomHexString();
  (await cookies()).set(STATE_COOKIE_KEY, state, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    expires: Date.now() + COOKIE_EXPIRATION_SECONDS * 1000
  });

  return state;
};

const createCodeVerifier = async () => {
  const codeVerifier = randomHexString();
  (await cookies()).set(CODE_VERIFIER_COOKIE_KEY, codeVerifier, {
    secure: true,
    httpOnly: true,
    sameSite: 'lax',
    expires: Date.now() + COOKIE_EXPIRATION_SECONDS * 1000
  });

  return codeVerifier;
};

const validateState = async (state: string) => {
  const cookieState = (await cookies()).get(STATE_COOKIE_KEY)?.value;
  return cookieState === state;
};

const getCodeVerifier = async () => {
  const codeVerifier = (await cookies()).get(CODE_VERIFIER_COOKIE_KEY)?.value;
  if (!codeVerifier) throw new InvalidCodeVerifierError();
  return codeVerifier;
};

class OAuthClient {
  private readonly tokenSchema = z.object({
    access_token: z.string(),
    token_type: z.string()
  });

  private readonly userSchema = z.object({
    id: z.string(),
    username: z.string(),
    global_name: z.string().nullable(),
    email: z.email()
  });

  private get redirectUrl() {
    return new URL('discord', process.env.OAUTH_REDIRECT_BASE);
  }

  async createAuthUrl() {
    if (!process.env.DISCORD_CLIENT_ID) {
      console.error('no oAuth client id found in env');
    }

    const state = await createState();
    const codeVerifier = await createCodeVerifier();
    const codeChallenge = await sha256Base64Url(codeVerifier);

    const url = new URL('https://discord.com/oauth2/authorize');

    url.searchParams.set('client_id', process.env.DISCORD_CLIENT_ID!);
    url.searchParams.set('redirect_uri', this.redirectUrl.toString());
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('scope', 'identify email');
    url.searchParams.set('state', state);
    url.searchParams.set('code_challenge_method', 'S256');
    url.searchParams.set('code_challenge', codeChallenge);
    return url.toString();
  }

  async fetchUser(code: string, state: string) {
    const isValidState = await validateState(state);
    if (!isValidState) throw new InvalidStateError();

    const { accessToken, tokenType } = await this.fetchToken(code);

    const res = await fetch('https://discord.com/api/users/@me', {
      headers: {
        Authorization: `${tokenType} ${accessToken}`
      }
    });
    const rawData = await res.json();

    const { data: user, success, error } = this.userSchema.safeParse(rawData);
    if (!success) throw new InvalidUserError(error);

    return {
      id: user.id,
      email: user.email,
      name: user.global_name ?? user.username
    };
  }

  private async fetchToken(code: string) {
    if (!process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_CLIENT_SECRET) {
      throw new Error('Missing Discord OAuth environment variables');
    }

    const codeVerifier = await getCodeVerifier();

    const body = new URLSearchParams({
      code,
      redirect_uri: this.redirectUrl.toString(),
      grant_type: 'authorization_code',
      client_id: process.env.DISCORD_CLIENT_ID,
      client_secret: process.env.DISCORD_CLIENT_SECRET,
      code_verifier: codeVerifier
    });

    const res = await fetch('https://discord.com/api/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json' // <- fix typo here
      },
      body
    });

    const rawData = await res.json();
    const { data, success, error } = this.tokenSchema.safeParse(rawData);

    if (!success) throw new InvalidTokenError(error);

    return {
      accessToken: data.access_token,
      tokenType: data.token_type
    };
  }
}

export class InvalidTokenError extends Error {
  constructor(zodError: z.ZodError) {
    super('Invalid Token');
    this.cause = zodError;
  }
}

export class InvalidUserError extends Error {
  constructor(zodError: z.ZodError) {
    super('Invalid User');
    this.cause = zodError;
  }
}

export class InvalidStateError extends Error {
  constructor() {
    super('Invalid State');
  }
}

export class InvalidCodeVerifierError extends Error {
  constructor() {
    super('Invalid Code Verifier');
  }
}

export default OAuthClient;
