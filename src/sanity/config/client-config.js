import { createClient } from 'next-sanity';

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DEV_DATASET || 'development';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION;

// eslint-disable-next-line no-unused-vars
export const client = createClient({
  projectId,
  dataset,
  apiVersion // https://www.sanity.io/docs/api-versioning
});
