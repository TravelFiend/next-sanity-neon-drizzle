import './globals.css';
import { Rubik, EB_Garamond, Martian_Mono } from 'next/font/google';
import client from '@/sanity/config/client-config';

/* We're using google variable fonts here.  You can also use
  regular google fonts but you'll need a different setup for
  the following font variables (i.e. adding a new property:
  `weights: ['400', '700']` to the font object) */

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
  title: 'E-Commerce-ism',
  description: 'We doin thangs, Next + Sanity'
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
        className={`${rubik.variable} ${ebGaramond.variable} ${martianMono.variable} ${
          headingFont && headingFont === 'mono'
            ? martianMono.className
            : headingFont === 'serif'
              ? ebGaramond.className
              : rubik.className
        }`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
