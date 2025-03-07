import Link from 'next/link';

const Footer = ({ footerData }) => {
  if (!footerData) return null;

  const { copyrightText, siteLinks, legalLinks, socialLinks } = footerData;

  return (
    <footer className="bottom-0 w-screen text-center">
      <div className="flex flex-col items-center">
        <div className="justify flex w-full justify-around border-b-2 border-b-blue-400 sm:justify-end">
          <ul className="flex flex-col pr-0 sm:pr-14">
            {siteLinks?.map(({ _key, slug, linkText }) => (
              <li key={_key}>
                <Link href={`/${slug.current}`}>{linkText}</Link>
              </li>
            ))}
          </ul>

          <ul className="flex flex-col pr-0 sm:pr-14">
            {legalLinks?.map(({ _key, slug, linkText }) => (
              <li key={_key}>
                <Link href={`/${slug.current}`}>{linkText}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex w-full flex-col-reverse items-center justify-between px-10 py-7 sm:flex-row">
          <p>© {copyrightText}</p>

          <ul className="flex justify-center">
            {socialLinks?.map(({ _key, icon, link }) => (
              <Link key={_key} href={`/${link?.slug.current}`}>
                <li className="pr-5">
                  <div
                    className="size-10 sm:size-15"
                    dangerouslySetInnerHTML={{ __html: icon }}
                  />
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
