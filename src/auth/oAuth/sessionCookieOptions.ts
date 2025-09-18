import type { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';

const SESSION_EXPIRATION = 60 * 60 * 24 * 7;

const baseSessionCookieOptions: Omit<ResponseCookie, 'name' | 'value'> = {
  secure: true,
  httpOnly: true,
  sameSite: 'lax',
  path: '/',
  expires: Date.now() + SESSION_EXPIRATION * 1000
};

export const getSessionCookieOptions = (): Omit<
  ResponseCookie,
  'name' | 'value'
> => ({
  ...baseSessionCookieOptions,
  expires: new Date(Date.now() + SESSION_EXPIRATION * 1000)
});

export default getSessionCookieOptions;
