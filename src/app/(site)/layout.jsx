import { Suspense } from 'react';
import MainHeader from '@/components/layout/mainHeader/MainHeader';
import Footer from '@/components/layout/Footer';
import { getSiteSettings } from '@/lib/actions/groqQueries/queries/siteSettings';
import { SanityLive } from '@/sanity/utils/live';

const siteLayout = async ({ children }) => {
  const { data } = await getSiteSettings();
  const { mainNav, footer } = data;

  if (!mainNav || !footer) {
    console.warn('Header and/or footer data is empty in Sanity');
  }

  // TODO: Move the <SanityLive /> component only on pages that need live content updates
  return (
    <>
      <Suspense fallback={<div className="h-12 sm:h-16" />}>
        {mainNav ? <MainHeader navData={mainNav} /> : null}
      </Suspense>
      <main>{children}</main>
      <SanityLive />
      {footer ? <Footer footerData={footer} /> : null}
    </>
  );
};

export default siteLayout;
