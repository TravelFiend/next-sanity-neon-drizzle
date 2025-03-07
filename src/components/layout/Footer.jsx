import Link from 'next/link';

const Footer = ({ footerData }) => {
  if (!footerData) return null;

  const { copyrightText, legalLinks, socialLinks } = footerData;

  return (
    <footer className="bottom-0 w-full text-center">
      <div className="flex flex-col">
        <ul className="flex flex-col">
          {legalLinks?.map(({ _key, slug, linkText }) => (
            <li key={_key}>
              <Link href={`/${slug.current}`}>{linkText}</Link>
            </li>
          ))}
        </ul>
        <ul className="flex justify-center">
          {socialLinks?.map(({ _key, slug }) => (
            <li key={_key}>
              <Link href={`/${slug.current}`}>TODO: Add icon here</Link>
            </li>
          ))}
        </ul>
      </div>

      <p>© {copyrightText}</p>
    </footer>
  );
};

export default Footer;
