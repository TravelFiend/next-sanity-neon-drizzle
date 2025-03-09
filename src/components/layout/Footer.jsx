import Link from 'next/link';

const Footer = ({ footerData }) => {
  if (!footerData) return null;

  const { copyrightText, siteLinks, legalLinks, socialLinks } = footerData;

  const generateLinks = linkSection => {
    return linkSection?.map(({ _key, internalLink, externalLink }) => (
      <li key={_key}>
        {internalLink ? (
          <Link href={`/${internalLink.slug.current}`}>
            {internalLink.linkText}
          </Link>
        ) : (
          <a href={`/${externalLink.url}`}>{externalLink.linkText}</a>
        )}
      </li>
    ));
  };

  return (
    <footer className="bottom-0 w-screen text-center">
      <div className="flex flex-col items-center">
        <div className="justify flex w-full justify-around border-b-2 border-b-blue-400 sm:justify-end">
          <ul className="flex flex-col pr-0 sm:pr-14">
            {generateLinks(siteLinks)}
          </ul>

          <ul className="flex flex-col pr-0 sm:pr-14">
            {generateLinks(legalLinks)}
          </ul>
        </div>

        <div className="flex w-full flex-col-reverse items-center justify-between px-10 py-7 sm:flex-row">
          <p>© {copyrightText}</p>

          <ul className="flex justify-center">
            {socialLinks?.map(({ _key, icon, link }) => (
              <a key={_key} href={link?.externalLink?.url}>
                <li className="pr-5">
                  <div
                    className="size-10 sm:size-15"
                    dangerouslySetInnerHTML={{ __html: icon }}
                  />
                </li>
              </a>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
