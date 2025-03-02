import MainHeader from '@/components/layout/MainHeader';
// import Footer from '@/components/layout/Footer';
import getSiteSettings from '@/lib/actions/groqQueries/siteSettings';
import { Suspense } from 'react';

export const metadata = {
  title: 'MJM LLC',
  description: 'Music, Art, Technology'
};

const siteLayout = async ({ children }) => {
  const siteSettings = await getSiteSettings();

  if (!siteSettings) {
    throw new Error('No site settings found');
  }

  return (
    <>
      <Suspense fallback={<div className="h-[280px]" />}>
        <MainHeader navData={siteSettings.mainNav} />
      </Suspense>

      <main>{children}</main>
      {/* <Footer /> */}
    </>
  );
};

export default siteLayout;
