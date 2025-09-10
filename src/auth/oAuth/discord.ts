import { z } from 'zod/v4';
import { OAuthClient } from './oAuthBase';

const createDiscordOAuthClient = () => {
  if (!process.env.DISCORD_CLIENT_ID || !process.env.DISCORD_CLIENT_SECRET) {
    throw new Error('Missing Discord OAuth environment variables');
  }

  return new OAuthClient({
    provider: 'discord',
    clientId: process.env.DISCORD_CLIENT_ID,
    clientSecret: process.env.DISCORD_CLIENT_SECRET,
    scopes: ['identify', 'email'],
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
        username: user.username ?? user.global_name,
        firstName: null,
        lastName: null,
        email: user.email
      })
    }
  });
};

export default createDiscordOAuthClient;
