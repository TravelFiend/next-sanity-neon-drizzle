import { z } from 'zod/v4';
import { OAuthClient } from './oAuthBase';

const createGithubOAuthClient = () => {
  if (!process.env.GITHUB_CLIENT_ID || !process.env.GITHUB_CLIENT_SECRET) {
    throw new Error('Missing Github OAuth environment variables');
  }

  return new OAuthClient({
    provider: 'github',
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    scopes: ['read:user', 'user:email', 'profile'],
    urls: {
      auth: 'https://github.com/login/oauth/authorize',
      token: 'https://github.com/login/oauth/access_token',
      user: 'https://api.github.com/user'
    },
    userInfo: {
      schema: z.object({
        id: z.number(),
        login: z.string(),
        name: z.string().nullable(),
        email: z.email()
      }),
      parser: user => ({
        id: user.id.toString(),
        username: user.login ?? user.name,
        firstName: null,
        lastName: null,
        email: user.email
      })
    }
  });
};

export default createGithubOAuthClient;
