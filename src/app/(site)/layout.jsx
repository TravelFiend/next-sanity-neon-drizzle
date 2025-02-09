import '../global.css';
import { Inter } from 'next/font/google';
import MainHeader from '@/components/layout/MainHeader';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MJM LLC',
  description: 'Music, Art, Technology'
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <MainHeader />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
};

export default RootLayout;
