import '../globals.css';

export const metadata = {
  title: 'E-Commerce-ism',
  description: 'We doin thangs, Next + Sanity'
};

const RootLayout = ({ children }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
