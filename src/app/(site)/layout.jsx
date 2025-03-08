// import { Suspense } from 'react';
// import MainHeader from '@/components/layout/mainHeader/MainHeader';
import Footer from '@/components/layout/Footer';
import getSiteSettings from '@groq/siteSettings';

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
      {/* <Suspense fallback={<div className="h-[280px]" />}>
        <MainHeader navData={siteSettings.mainNav} />
      </Suspense> */}

      <main>{children}</main>
      <Footer footerData={siteSettings.footer} />
    </>
  );
};

export default siteLayout;
