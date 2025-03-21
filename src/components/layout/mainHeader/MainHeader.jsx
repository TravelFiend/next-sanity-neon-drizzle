import Link from 'next/link';
import Nav from './Nav';

const MainHeader = ({ navData }) => {
  if (!navData) return null;

  return (
    <header className="fixed z-50 flex h-12 w-full justify-between bg-secondary sm:h-16 dark:bg-primary">
      <Link href="/">
        <div
          className="ml-6 flex size-12 items-center sm:size-16"
          dangerouslySetInnerHTML={{ __html: navData.companyLogo }}
        />
      </Link>

      <Nav linkData={navData.navTabs} />
    </header>
  );
};

export default MainHeader;
