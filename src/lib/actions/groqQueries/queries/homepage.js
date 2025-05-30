'use server';

import { defineQuery } from 'next-sanity';
import { sanityFetch } from '@/sanity/utils/live';
import contentBlocksFragment from '../fragments/contentblock';
import seoFragment from '../fragments/seo';

const HOMEPAGE_QUERY = defineQuery(`*[_type == "homepage"][0]{
  _type,
  contentBlocks[]{
    ${contentBlocksFragment}
  },
  ${seoFragment}
}`);

const getHomepage = async () => {
  try {
    const homepageData = await sanityFetch({
      query: HOMEPAGE_QUERY
    });

    if (!homepageData || !homepageData.data) {
      throw new Error('Homepage data not found');
    }

    return homepageData;
  } catch (err) {
    throw new Error(`Error fetching homepage content: ${err}`);
  }
};

export { getHomepage };
