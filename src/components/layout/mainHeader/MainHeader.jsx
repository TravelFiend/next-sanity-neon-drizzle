import Link from 'next/link';
import Nav from './Nav';

const MainHeader = ({ navData }) => {
  if (!navData) return null;

  return (
    <header className="sticky top-0 z-50 flex h-12 w-full justify-between bg-primary/80 backdrop-blur-sm sm:h-16 dark:bg-secondary/80">
      <Link href="/">
        <div
          className="ml-6 flex size-12 items-center sm:size-16"
          dangerouslySetInnerHTML={{ __html: navData.companyLogo }}
          aria-label="Company logo: Link to home page"
        />
      </Link>

      <Nav linkData={navData.navTabs} />
    </header>
  );
};

export default MainHeader;
