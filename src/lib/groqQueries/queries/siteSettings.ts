import { defineQuery } from 'next-sanity';
import { sanityFetch } from '@/sanity/utils/live';

const internalLinkFragment = `
  internalLink{
    linkText,
    slug
  }
`;

const SITE_SETTINGS_QUERY = defineQuery(`*[_type == "siteSettings"][0]{
  mainNav{
    _type,
    companyLogo,
    navTabs[]{
      _key,
      link{
        ${internalLinkFragment}
      },
      secondLevelLinks[]{
        _type,
        _key,
        secondLevelLink{
          ${internalLinkFragment}
        },
        thirdLevelLinks[]{
          _key,
          ${internalLinkFragment}
        }
      }
    }
  },
  footer{
    _type,
    legalLinks[]{
      _key,
      ${internalLinkFragment}
    },
    siteLinks[]{
      _key,
      ${internalLinkFragment}
    },
    socialLinks[]{
      _key,
      icon,
      link{
        externalLink{
          url,
          linkText
        }
      }
    },
    copyrightText
  }
}`);

const getSiteSettings = async () => {
  try {
    const { data } = await sanityFetch({
      query: SITE_SETTINGS_QUERY
    });

    return data;
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
    const { data } = await sanityFetch({
      query: SITEWIDE_METADATA_QUERY,
      // Metadata should never contain stega
      stega: false
    });

    return data;
  } catch (err) {
    console.error(`Error fetching site-wide metadata: ${err}`);
    return null;
  }
};

export { getSiteSettings, getSitewideMetaData };
