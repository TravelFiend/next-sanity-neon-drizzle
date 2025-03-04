import Link from 'next/link';
import DesktopNav from './DesktopNav';
import MobileNav from './MobileNav';

const MainHeader = async ({ navData }) => {
  if (!navData) return null;

  return (
    <header className="fixed flex h-12 w-full justify-between bg-amber-400 sm:h-16">
      <Link href="/">
        <div
          className="size-12 sm:size-16"
          dangerouslySetInnerHTML={{ __html: navData.companyLogo }}
        />
      </Link>

      <DesktopNav linkData={navData.navTabs} />
      <MobileNav linkData={navData.navTabs} />
    </header>
  );
};

export default MainHeader;
