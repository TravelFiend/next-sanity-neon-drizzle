import Link from 'next/link';
import Nav from './Nav';
import type { MainNav } from '@/sanity/types';

type MainHeaderProps = {
  navData: MainNav;
};

const MainHeader: React.FC<MainHeaderProps> = ({ navData }) => {
  if (!navData) return null;

  return (
    <header className="sticky top-0 z-50 flex h-12 w-full justify-between bg-primary/80 backdrop-blur-sm sm:h-16 dark:bg-secondary/80">
      {navData.companyLogo ? (
        <Link href="/">
          <div
            className="ml-6 flex size-12 items-center sm:size-16"
            dangerouslySetInnerHTML={{ __html: navData.companyLogo }}
            aria-label="Company logo: Link to home page"
          />
        </Link>
      ) : (
        <span className="ml-6 block size-12 sm:size-16" aria-hidden="true" />
      )}

      <Nav linkData={navData.navTabs} />
    </header>
  );
};

export default MainHeader;
