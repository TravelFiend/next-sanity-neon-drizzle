'use server';

import client from '@/sanity/config/client-config';

const getSiteSettings = async () => {
  try {
    const siteSettings = await client.fetch(`*[_type == "siteSettings"][0]{
      mainNav{
        companyLogo,
        navTabs[]{
          _key,
          link{
            linkText,
            slug
          },
          secondLevelLinks[]{
            _key,
            secondLevelLink{
              linkText,
              slug,
            },
            thirdLevelLinks[]{
              _key,
              linkText,
              slug
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

    return siteSettings;
  } catch (err) {
    console.error(`Error fetching site settings: ${err}`);
    return null;
  }
};

export default getSiteSettings;
