import Link from 'next/link';
import cleanSVG from '@/lib/utils/sanitizeSVG';
import type { MainNavRes } from '@sanityTypes/derivedTypes';
import { getCurrentUser } from '@/auth/session.server';
import Nav from './Nav';

type MainHeaderProps = {
  navData: MainNavRes;
};

const MainHeader: React.FC<MainHeaderProps> = async ({ navData }) => {
  if (!navData) return null;

  const user = await getCurrentUser({
    withFullUser: false,
    redirectIfNotFound: false
  });
  const { companyLogo, navTabs } = navData;

  return (
    <header className="fixed top-0 z-50 flex h-12 w-full justify-between bg-primary/80 backdrop-blur-sm sm:h-16 dark:bg-secondary/80">
      {companyLogo ? (
        <Link href="/">
          <div
            className="ml-6 flex size-12 items-center sm:size-16"
            dangerouslySetInnerHTML={{ __html: cleanSVG(companyLogo) }}
            aria-label="Company logo: Link to home page"
          />
        </Link>
      ) : (
        <span className="ml-6 block size-12 sm:size-16" aria-hidden="true" />
      )}

      <Nav linkData={navTabs} user={user} />
    </header>
  );
};

export default MainHeader;
