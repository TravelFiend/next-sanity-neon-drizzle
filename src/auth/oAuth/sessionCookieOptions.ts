import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const DEFAULT_SESSION_EXPIRATION = 60 * 60 * 24 * 7;

const baseSessionCookieOptions: Omit<
  ResponseCookie,
  'name' | 'value' | 'expires'
> = {
  secure: true,
  httpOnly: true,
  sameSite: 'lax',
  path: '/'
};

export const getSessionCookieOptions = (
  expirySeconds: number = DEFAULT_SESSION_EXPIRATION
): Omit<ResponseCookie, 'name' | 'value'> => ({
  ...baseSessionCookieOptions,
  expires: new Date(Date.now() + expirySeconds * 1000)
});

export default getSessionCookieOptions;
