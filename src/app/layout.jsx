import './globals.css';
import { Rubik, EB_Garamond, Martian_Mono } from 'next/font/google';
import {
  getMainFont,
  getSitewideMetaData
} from '@/lib/actions/groqQueries/siteSettings';

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

/* docs here: https://nextjs.org/docs/app/api-reference/functions/generate-metadata
  TODO: we should include as many fields as possible when ready */
export const generateMetadata = async () => {
  const {
    data: { seo }
  } = await getSitewideMetaData();

  return {
    title: {
      template: `%s | ${seo.metaTitle}`,
      default: seo.metaTitle
    },
    description: seo.metaDescription,
    keywords: seo.metaKeywords,
    generator: 'Next.js'
  };
};

const RootLayout = async ({ children }) => {
  const {
    data: {
      fonts: { headingFont }
    }
  } = await getMainFont();

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
