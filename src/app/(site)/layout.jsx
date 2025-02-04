import Image from 'next/image';
import client from '../../sanity/config/client-config';
import '../app.css';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import { urlFor } from '../../lib/sanity';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MJM LLC',
  description: 'Music, Art, Technology'
};

const RootLayout = async ({ children }) => {
  const mainNavigation = await client.fetch(`*[_type == "mainNav"][0]{
    companyLogo,
    navLinks[]{
      linkText,
      href
    }
  }`);

  const { companyLogo, navLinks } = mainNavigation;

  const mainLinks = navLinks.map(({ href, linkText }) => (
    <li key={linkText}>
      <Link href={href}>{linkText}</Link>
    </li>
  ));

  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex justify-between">
          <Link href="/">
            <Image
              src={urlFor(companyLogo).url()}
              width="200"
              height="150"
              alt={`${companyLogo.altText}.  Links to Home Page`}
            />
          </Link>

          <nav>
            <ul className="flex">{mainLinks}</ul>
          </nav>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
