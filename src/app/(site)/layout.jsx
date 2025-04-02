import { Fragment, Suspense } from 'react';
import MainHeader from '@/components/layout/mainHeader/MainHeader';
import Footer from '@/components/layout/Footer';
import { getSiteSettings } from '@/lib/actions/groqQueries/queries/siteSettings';
import { SanityLive } from '@/sanity/utils/live';

const siteLayout = async ({ children }) => {
  const {
    data: { mainNav, footer }
  } = await getSiteSettings();

  if (!mainNav || !footer) {
    console.warn('Header and/or footer data is empty in Sanity');
  }

  return (
    <>
      <Suspense fallback={<div className="h-72" />}>
        {mainNav ? <MainHeader navData={mainNav} /> : null}
      </Suspense>
      <main>{children}</main>
      <SanityLive />
      {footer ? <Footer footerData={footer} /> : null}
    </>
  );
};

export default siteLayout;
