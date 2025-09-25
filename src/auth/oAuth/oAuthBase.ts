/* eslint-disable drizzle/enforce-delete-with-where */
import { randomHexString, sha256Base64Url } from '@/lib/utils/cryptoFunctions';
import { cookies } from 'next/headers';
import { z } from 'zod/v4';
import createDiscordOAuthClient from './discord';
import createGoogleOAuthClient from './google';
import createGithubOAuthClient from './github';
import createFacebookOAuthClient from './facebook';
import getSessionCookieOptions from './sessionCookieOptions';
import type { OAuthProvider } from '@/_drizzle/schemas';

const STATE_COOKIE_KEY = 'oAuthState';
const CODE_VERIFIER_COOKIE_KEY = 'oAuthCodeVerifier';
const COOKIE_EXPIRATION_SECONDS = 60 * 10; // 10 minutes

const createEphemeralCookie = async (key: string): Promise<string> => {
  const protectionKey = randomHexString();
  (await cookies()).set(
    key,
    protectionKey,
    getSessionCookieOptions(COOKIE_EXPIRATION_SECONDS)
  );

  return protectionKey;
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

const clearOAuthCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(STATE_COOKIE_KEY);
  cookieStore.delete(CODE_VERIFIER_COOKIE_KEY);
};

class OAuthClient<T extends object> {
  private readonly provider: OAuthProvider;
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly scopes: string[];
  private readonly urls: {
    auth: string;
    token: string;
    user: string;
  };
  private readonly userInfo: {
    schema: z.ZodSchema<T>;
    parser: (data: T) => {
      id: string;
      email: string;
      username: string;
      firstName: string | null;
      lastName: string | null;
    };
  };
  private readonly tokenSchema = z.object({
    access_token: z.string(),
    token_type: z.string()
  });

  constructor({
    provider,
    clientId,
    clientSecret,
    scopes,
    urls,
    userInfo
  }: {
    provider: OAuthProvider;
    clientId: string;
    clientSecret: string;
    scopes: string[];
    urls: {
      auth: string;
      token: string;
      user: string;
    };
    userInfo: {
      schema: z.ZodSchema<T>;
      parser: (data: T) => {
        id: string;
        email: string;
        username: string;
        firstName: string | null;
        lastName: string | null;
      };
    };
  }) {
    this.provider = provider;
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.scopes = scopes;
    this.urls = urls;
    this.userInfo = userInfo;
  }

  private get redirectUrl() {
    return new URL(this.provider, process.env.OAUTH_REDIRECT_BASE);
  }

  async createAuthUrl() {
    const state = await createEphemeralCookie(STATE_COOKIE_KEY);
    const codeVerifier = await createEphemeralCookie(CODE_VERIFIER_COOKIE_KEY);
    const codeChallenge = await sha256Base64Url(codeVerifier);

    const url = new URL(this.urls.auth);

    url.searchParams.set('client_id', this.clientId);
    url.searchParams.set('redirect_uri', this.redirectUrl.toString());
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('scope', this.scopes.join(' '));
    url.searchParams.set('state', state);
    url.searchParams.set('code_challenge_method', 'S256');
    url.searchParams.set('code_challenge', codeChallenge);
    return url.toString();
  }

  async fetchUser(code: string, state: string) {
    try {
      const isValidState = await validateState(state);
      if (!isValidState) throw new InvalidStateError();

      const { accessToken, tokenType } = await this.fetchToken(code);

      let res: Response;
      if (this.provider === 'facebook') {
        // Facebook's `/me` route requires access_token as a query param
        const url = new URL(this.urls.user);
        url.searchParams.set('access_token', accessToken);

        res = await fetch(url.toString());
      } else {
        res = await fetch(this.urls.user, {
          headers: {
            Authorization: `${tokenType} ${accessToken}`
          }
        });
      }

      const rawData = await res.json();
      if ('error' in rawData) {
        throw new Error(
          `${this.provider} API error: ${rawData.error.message ?? 'Unknown error'}`
        );
      }

      const {
        data: user,
        success,
        error
      } = this.userInfo.schema.safeParse(rawData);

      if (!success) throw new InvalidUserError(error);
      if (!('email' in user) || !user.email) throw new MissingEmailError();

      return this.userInfo.parser(user);
    } finally {
      await clearOAuthCookies();
    }
  }

  private async fetchToken(code: string) {
    const codeVerifier = await getCodeVerifier();

    const body = new URLSearchParams({
      code,
      redirect_uri: this.redirectUrl.toString(),
      grant_type: 'authorization_code',
      client_id: this.clientId,
      client_secret: this.clientSecret,
      code_verifier: codeVerifier
    });

    const res = await fetch(this.urls.token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json'
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

const getOAuthClient = (provider: OAuthProvider) => {
  switch (provider) {
    case 'discord':
      return createDiscordOAuthClient();
    case 'github':
      return createGithubOAuthClient();
    case 'facebook':
      return createFacebookOAuthClient();
    case 'google':
      return createGoogleOAuthClient();
    default:
      throw new Error(`Invalid provider: ${provider satisfies never}`);
  }
};

class InvalidTokenError extends Error {
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

export class MissingEmailError extends Error {
  constructor() {
    super(
      'Your Facebook account did not provide an email. Please allow email access to continue, or choose a different provider.'
    );
  }
}

export class InvalidStateError extends Error {
  constructor() {
    super('Invalid State');
  }
}

class InvalidCodeVerifierError extends Error {
  constructor() {
    super('Invalid Code Verifier');
  }
}

export { OAuthClient, getOAuthClient };
