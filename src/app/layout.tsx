import './globals.css';
import { Rubik, EB_Garamond, Martian_Mono } from 'next/font/google';
import { getSitewideMetaData } from '@/lib/groqQueries/queries/siteSettings';

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
  TODO: we should include as many fields as possible when ready and update default values */
export const generateMetadata = async () => {
  const metadata = await getSitewideMetaData();
  if (!metadata)
    return {
      title: 'MJM LLC or whatever our company name will be',
      description: 'Cool stuff for art and music lovers',
      keywords: ['Art', 'Music', 'Posters'],
      generator: 'Next.js'
    };

  const { seo } = metadata;

  return {
    title: {
      template: `%s | ${seo?.metaTitle}`,
      default: seo?.metaTitle
    },
    description: seo?.metaDescription,
    keywords: seo?.metaKeywords,
    generator: 'Next.js'
  };
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body
        className={`${rubik.variable} ${rubik.className} ${ebGaramond.variable} ${martianMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
