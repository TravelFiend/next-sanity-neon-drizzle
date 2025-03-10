'use server';

import { defineQuery } from 'next-sanity';
import { sanityFetch } from '@/sanity/utils/live';

const SITE_SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]{
  mainNav{
    companyLogo,
    navTabs[]{
      _key,
      link{
        internalLink{
          linkText,
          slug
        }
      },
      secondLevelLinks[]{
        _key,
        secondLevelLink{
          internalLink{
            linkText,
            slug
          }
        },
        thirdLevelLinks[]{
          _key,
          internalLink{
            linkText,
            slug
          }
        }
      }
    }
  },
  footer{
    legalLinks[]{
      _key,
      internalLink{
        linkText,
        slug
      }
    },
    siteLinks[]{
      _key,
      internalLink{
        linkText,
        slug
      }
    },
    socialLinks[]{
      _key,
      icon,
      link{
        externalLink{
          url
        }
      }
    },
    copyrightText
  }
}`);

const getSiteSettings = async () => {
  try {
    const siteSettings = await sanityFetch({
      query: SITE_SETTINGS_QUERY
    });

    return siteSettings;
  } catch (err) {
    console.error(`Error fetching site settings: ${err}`);
    return null;
  }
};

const SITEWIDE_METADATA_QUERY = defineQuery(`*[_type == "siteSettings"][0]{
  seo{
    metaTitle,
    metaDescription,
    metaKeywords[]
  }
}`);

const getSitewideMetaData = async () => {
  try {
    const sitewideMetadataData = await sanityFetch({
      query: SITEWIDE_METADATA_QUERY,
      // Metadata should never contain stega
      stega: false
    });

    return sitewideMetadataData;
  } catch (err) {
    console.error(`Error fetching site-wide metadata: ${err}`);
    return null;
  }
};

export { getSiteSettings, getSitewideMetaData };
