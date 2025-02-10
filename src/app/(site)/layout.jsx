import '../globals.css';
import { Rubik, EB_Garamond, Martian_Mono } from 'next/font/google';
import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';
import client from '@/sanity/config/client-config';

/* We're using google variable fonts here.  You can also use
  regular google fonts but you'll need a different setup for
  the following font variables (i.e. adding a new property:
  `weights: ['400', '700']` to the font object).  These variables
  are thenadded in `globals.css` under the `@theme inline`
  directive */

// sans-serif
const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik'
});

// serif
const ebGaramond = EB_Garamond({
  subsets: ['latin'],
  variable: '--font-garamond'
});

// mono
const martianMono = Martian_Mono({
  subsets: ['latin'],
  variable: '--font-martian'
});

export const metadata = {
  title: 'MJM LLC',
  description: 'Music, Art, Technology'
};

const RootLayout = async ({ children }) => {
  const {
    fonts: { headingFont }
  } = await client.fetch(`*[_type == "siteSettings"][0]{
    fonts {
      headingFont
    }
  }`);

  return (
    <html lang="en">
      <body
        className={` ${headingFont === 'sans-serif' ? rubik.className : rubik.variable} ${headingFont === 'serif' ? ebGaramond.className : ebGaramond.variable} ${headingFont === 'mono' ? martianMono.className : martianMono.variable} `}
      >
        <MainHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
