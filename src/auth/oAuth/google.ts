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
      auth: 'https://discord.com/oauth2/authorize',
      token: 'https://discord.com/api/oauth2/token',
      user: 'https://discord.com/api/users/@me'
    },
    userInfo: {
      schema: z.object({
        id: z.string(),
        username: z.string(),
        global_name: z.string().nullable(),
        email: z.email()
      }),
      parser: user => ({
        id: user.id,
        name: user.global_name || user.username,
        email: user.email
      })
    }
  });
};

export default createGoogleOAuthClient;
