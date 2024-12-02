import '../globals.css';
// import Image from 'next/image';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'MJM LLC',
  description: 'Music, Art, Technology'
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="flex justify-between">
          <Link href="/">MJM LLC</Link>

          <nav>
            <Link href="/about">About Us</Link>
          </nav>
        </header>

        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
