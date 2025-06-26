'use server';

import { defineQuery } from 'next-sanity';
import contentBlocksFragment from '../fragments/contentblock';
import seoFragment from '../fragments/seo';
import { sanityFetch } from '@/sanity/utils/live';

const HOMEPAGE_QUERY = defineQuery(`*[_type == "homepage"][0]{
  _type,
  contentBlocks[]{
    ${contentBlocksFragment}
  },
  ${seoFragment}
}`);

const getHomepage = async () => {
  try {
    const { data: homepageData } = await sanityFetch({
      query: HOMEPAGE_QUERY
    });

    if (!homepageData?._type) {
      return null;
    }

    return homepageData;
  } catch (err) {
    console.error('Error fetching homepage content:', err);
    return null;
  }
};

export { getHomepage };
