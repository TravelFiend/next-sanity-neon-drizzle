import { z } from 'zod/v4';
import { OAuthClient } from './oAuthBase';

const createFacebookOAuthClient = () => {
  if (!process.env.FACEBOOK_CLIENT_ID || !process.env.FACEBOOK_CLIENT_SECRET) {
    throw new Error('Missing Facebook OAuth environment variables');
  }

  return new OAuthClient({
    provider: 'facebook',
    clientId: process.env.FACEBOOK_CLIENT_ID,
    clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
    scopes: ['email', 'public_profile'],
    urls: {
      auth: 'https://www.facebook.com/v19.0/dialog/oauth',
      token: 'https://graph.facebook.com/v19.0/oauth/access_token',
      user: 'https://graph.facebook.com/me?fields=id,name,first_name,last_name,email'
    },
    userInfo: {
      schema: z.object({
        id: z.string(),
        name: z.string(),
        first_name: z.string(),
        last_name: z.string(),
        email: z.email()
      }),
      parser: user => ({
        id: user.id,
        username: user.name,
        firstName: user.first_name ?? null,
        lastName: user.last_name ?? null,
        email: user.email
      })
    }
  });
};

export default createFacebookOAuthClient;
