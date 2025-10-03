import { z } from 'zod/v4';
import { OAuthClient } from './oAuthBase';

const createUSPSOAuthClient = () => {
  if (!process.env.USPS_CONSUMER_KEY || !process.env.USPS_CONSUMER_SECRET) {
    throw new Error('Missing USPS OAuth environment variables');
  }

  return new OAuthClient({
    provider: 'github',
    clientId: process.env.USPS_CONSUMER_KEY,
    clientSecret: process.env.USPS_CONSUMER_SECRET,
    scopes: ['addresses'],
    urls: {
      // test urls
      auth: 'https://apis-tem.usps.com/oauth2/v3/authorize',
      token: 'https://apis-tem.usps.com/oauth2/v3/token'
      // production urls
      // auth: 'https://apis.usps.com/oauth2/v3/authorize',
      // token: 'https://apis.usps.com/oauth2/v3/token'
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

export default createUSPSOAuthClient;
