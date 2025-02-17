import Link from 'next/link';
import Image from 'next/image';
import client from '@/sanity/config/client-config';
import { urlFor } from '@/lib/sanity';

const MainHeader = async () => {
  const { mainNav } = await client.fetch(`*[_type == "siteSettings"][0]{
    mainNav{
      companyLogo,
      navLinks[]{
        linkText,
        href
      }
    }
  }`);

  const { companyLogo, navLinks } = mainNav;

  const mainLinks = navLinks.map(({ linkText, href }) => (
    <li key={linkText}>
      <Link href={href}>{linkText}</Link>
    </li>
  ));

  return (
    <header className="fixed flex w-full justify-between">
      <Link href="/">
        <Image
          src={urlFor(companyLogo).url()}
          width="150"
          height="100"
          alt={`${companyLogo.altText}.  Links to Home Page`}
        />
      </Link>

      <nav>
        <ul className="flex">{mainLinks}</ul>
      </nav>
    </header>
  );
};

export default MainHeader;
