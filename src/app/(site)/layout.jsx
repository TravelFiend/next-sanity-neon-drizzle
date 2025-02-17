import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';

export const metadata = {
  title: 'MJM LLC',
  description: 'Music, Art, Technology'
};

const siteLayout = async ({ children }) => {
  return (
    <>
      <MainHeader />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default siteLayout;
