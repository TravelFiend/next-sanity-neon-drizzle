import Link from 'next/link';
import Nav from './Nav';

const MainHeader = ({ navData }) => {
  if (!navData) return null;

  return (
    <header className="fixed flex h-12 w-full justify-between bg-amber-400 sm:h-16">
      <Link href="/">
        <div
          className="size-12 sm:size-16"
          dangerouslySetInnerHTML={{ __html: navData.companyLogo }}
        />
      </Link>

      <Nav linkData={navData.navTabs} />
    </header>
  );
};

export default MainHeader;
