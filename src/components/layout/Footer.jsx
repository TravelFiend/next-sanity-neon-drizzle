import client from '@/sanity/config/client-config';
import Link from 'next/link';

const Footer = async () => {
  const { footer } = await client.fetch(`*[_type == "siteSettings"][0]{
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

  const { copyrightText, footerLinks, socialLinks } = footer;

  return (
    <footer className="fixed bottom-0 w-full text-center">
      <div className="flex flex-col">
        <ul className="flex flex-col">
          {footerLinks?.map(({ _key, href, linkText }) => (
            <li key={_key}>
              <Link href={href}>{linkText}</Link>
            </li>
          ))}
        </ul>
        <ul className="flex justify-center">
          {socialLinks?.map(({ _key, icon, href }) => (
            <li key={_key}>
              <Link href={href}>TODO: Add icon here</Link>
            </li>
          ))}
        </ul>
      </div>

      <p>© {copyrightText}</p>
    </footer>
  );
};

export default Footer;
