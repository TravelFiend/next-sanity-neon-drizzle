import { Suspense } from 'react';
import MainHeader from '@/components/layout/mainHeader/MainHeader';
import Footer from '@/components/layout/Footer';
import { getSiteSettings } from '@groq/siteSettings';
import { SanityLive } from '@/sanity/config/client-config';

const siteLayout = async ({ children }) => {
  const {
    data: { mainNav, footer }
  } = await getSiteSettings();

  if (!mainNav || !footer) {
    throw new Error('No site settings found');
  }

  return (
    <>
      <Suspense fallback={<div className="h-[280px]" />}>
        <MainHeader navData={mainNav} />
      </Suspense>

      <main>{children}</main>
      <SanityLive />
      <Footer footerData={footer} />
    </>
  );
};

export default siteLayout;
