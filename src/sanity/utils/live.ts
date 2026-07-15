import { defineLive } from 'next-sanity/live';
import client from '../client-config';

// https://www.sanity.io/docs/developer-guides/live-content-guide

/* TODO: Live Content API is still experimental and is likely to change
  we should use this selectively to keep our API usage down, only for
  content that is likely to frequently change.  For static data from Sanity,
  use `client.fetch(`[QUERY]`)` */
const token = process.env.SANITY_API_READ_TOKEN;
if (!token) {
  throw new Error('Missing SANITY_API_READ_TOKEN');
}

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token
});
