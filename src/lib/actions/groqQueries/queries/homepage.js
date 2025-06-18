'use server';

import { defineQuery, groq } from 'next-sanity';
import { sanityFetch } from '@/sanity/utils/live';
import contentBlocksFragment from '../fragments/contentblock';
import seoFragment from '../fragments/seo';

const RAW_HOMEPAGE_QUERY = groq`*[_type == "homepage"][0]{
  _type,
  contentBlocks[]{
    ${contentBlocksFragment}
  },
  ${seoFragment}
}`;

const HOMEPAGE_QUERY = defineQuery(RAW_HOMEPAGE_QUERY);

const getHomepage = async () => {
  try {
    const homepageData = await sanityFetch({
      query: HOMEPAGE_QUERY
    });

    if (!homepageData?.data) {
      return null;
    }

    return homepageData;
  } catch (err) {
    console.error('Error fetching homepage content:', err);
    return null;
  }
};

export { getHomepage };
