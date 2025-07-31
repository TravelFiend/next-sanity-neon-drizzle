import Link from 'next/link';
import type { SITE_SETTINGS_QUERYResult } from '@sanityTypes/generatedTypes';

type FooterLegalLinksFromSanity = NonNullable<
  NonNullable<SITE_SETTINGS_QUERYResult>['footer']
>['legalLinks'];
import cleanSVG from '@/lib/utils/sanitizeSVG';

type FooterProps = {
  footerData: NonNullable<SITE_SETTINGS_QUERYResult>['footer'];
};

const Footer: React.FC<FooterProps> = ({ footerData }) => {
  if (!footerData) return null;

  const { copyrightText, siteLinks, legalLinks, socialLinks } = footerData;

  const generateLinks = (linkSection: FooterLegalLinksFromSanity) => {
    return linkSection?.map(({ _key, internalLink, externalLink }) => (
      <li key={_key}>
        {internalLink ? (
          <Link href={`/${internalLink.slug.current}`}>
            {internalLink.linkText}
          </Link>
        ) : (
          <a href={`/${externalLink?.url}`}>{externalLink?.linkText}</a>
        )}
      </li>
    ));
  };

  return (
    <footer className="bottom-0 w-screen text-center">
      <div className="flex flex-col items-center">
        <div className="justify flex w-full justify-around border-b-2 border-b-blue-400 sm:justify-end">
          {siteLinks ? (
            <ul className="flex flex-col pr-0 sm:pr-14">
              {generateLinks(siteLinks)}
            </ul>
          ) : null}

          {legalLinks ? (
            <ul className="flex flex-col pr-0 sm:pr-14">
              {generateLinks(legalLinks)}
            </ul>
          ) : null}
        </div>

        <div className="flex w-full flex-col-reverse items-center justify-between px-10 py-7 sm:flex-row">
          <p>© {copyrightText}</p>

          <ul className="flex justify-center">
            {socialLinks?.map(({ _key, icon, link }) => (
              <li key={_key} className="pr-5">
                <a
                  href={link?.externalLink?.url}
                  aria-label={
                    link?.externalLink?.linkText
                      ? link?.externalLink.linkText
                      : `Social media link: ${link.externalLink?.url}`
                  }
                >
                  <div
                    className="size-10 sm:size-15"
                    dangerouslySetInnerHTML={{ __html: cleanSVG(icon) }}
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
