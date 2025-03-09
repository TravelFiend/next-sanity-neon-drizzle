import { createClient, defineLive } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'development';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

const client = createClient({
  projectId,
  dataset,
  apiVersion, // https://www.sanity.io/docs/api-versioning
  useCdn: process.env.NEXT_PUBLIC_SANITY_DATASET === 'production' ? true : false
});

// TODO: Live Content API is still experimental and is likely to change
const token = process.env.SANITY_API_READ_TOKEN;
if (!token) {
  throw new Error('Missing SANITY_API_READ_TOKEN');
}

export const { sanityFetch, SanityLive } = defineLive({
  client,
  serverToken: token,
  browserToken: token
});
