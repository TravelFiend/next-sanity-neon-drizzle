import { z } from 'zod/v4';
import { OAuthClient } from './oAuthBase';

const createGoogleOAuthClient = () => {
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    throw new Error('Missing Google OAuth environment variables');
  }

  return new OAuthClient({
    provider: 'google',
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    scopes: ['openid', 'email', 'profile'],
    urls: {
      auth: 'https://accounts.google.com/o/oauth2/v2/auth',
      token: 'https://oauth2.googleapis.com/token',
      user: 'https://openidconnect.googleapis.com/v1/userinfo'
    },
    userInfo: {
      schema: z.object({
        sub: z.string(),
        name: z.string(),
        given_name: z.string().nullable(),
        email: z.email()
      }),
      parser: user => ({
        id: user.sub,
        name: user.name ?? user.given_name,
        email: user.email
      })
    }
  });
};

export default createGoogleOAuthClient;
