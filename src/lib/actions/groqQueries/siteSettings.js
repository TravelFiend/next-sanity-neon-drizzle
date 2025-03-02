'use server';

import client from '@/sanity/config/client-config';

const getSiteSettings = async () => {
  try {
    const siteSettings = await client.fetch(`*[_type == "siteSettings"][0]{
      mainNav{
        companyLogo,
        navTabs[]{
          link{
            linkText,
            slug
          },
          secondLevelLinks[]{
            secondLevelLink{
              linkText,
              slug,
            },
            thirdLevelLinks[]{
              linkText,
              slug
            }
          }
        }
      },
      footer{
        footerLinks[]{
          _key,
          linkText,
          href
        },
        socialLinks[]{
          _key,
          icon,
          href
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
