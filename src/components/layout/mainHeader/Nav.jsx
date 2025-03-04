'use client';

import conditionalClasses from '@/lib/utils/conditionalClasses';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MobileSubNav from './MobileSubNav';
import { usePathname } from 'next/navigation';
import DesktopSubNav from './DesktopSubNav';

const Nav = ({ linkData }) => {
  const [areLinksOpen, setAreLinksOpen] = useState(false);
  const [areChildLinksOpen, setAreChildLinksOpen] = useState(false);
  const [currentChildren, setCurrentChildren] = useState(null);
  const pathName = usePathname();

  useEffect(() => {
    setAreLinksOpen(false);
    setAreChildLinksOpen(false);
  }, [pathName]);

  const handleHamburgerClick = () => {
    setAreLinksOpen(!areLinksOpen);
    setAreChildLinksOpen(false);
  };

  const handleMainLinkClick = evt => {
    setAreChildLinksOpen(!areChildLinksOpen);
    const theKids = linkData.filter(
      singleLinkData => singleLinkData.link.linkText === evt.currentTarget.id
    )[0];
    setCurrentChildren(theKids?.secondLevelLinks);
  };

  const mainLinks = linkData?.map(({ link, secondLevelLinks }) => {
    if (secondLevelLinks) {
      return (
        <li
          key={link.linkText}
          className="cursor-pointer list-none sm:mr-1 sm:px-4"
        >
          <button
            id={link.linkText}
            type="button"
            onClick={handleMainLinkClick}
            className="flex w-full cursor-pointer justify-between"
          >
            <span>{link.linkText}</span>
            <span className="sm:hidden">&rarr;</span>
          </button>
        </li>
      );
    }

    return (
      <li key={link.linkText} className="cursor-pointer sm:mr-1 sm:px-4">
        <Link href={`/${link.slug.current}`}>{link.linkText}</Link>
      </li>
    );
  });

  return (
    <nav className="block bg-cyan-600">
      <div
        className="flex h-full cursor-pointer items-center px-5 sm:hidden"
        onClick={handleHamburgerClick}
      >
        <span>X</span>
      </div>

      <ul
        className={conditionalClasses(
          'absolute left-1/6 flex w-5/6 translate-x-full flex-col justify-center bg-lime-900 sm:static sm:left-0 sm:h-full sm:w-full sm:translate-x-0 sm:flex-row sm:items-center sm:transition-none',
          areLinksOpen ? '-translate-x-0 transition-transform' : ''
        )}
      >
        {mainLinks}
      </ul>

      <MobileSubNav
        isOpen={areChildLinksOpen}
        setIsOpen={setAreChildLinksOpen}
        currentChildren={currentChildren}
      />
      <DesktopSubNav
        isOpen={areChildLinksOpen}
        setIsOpen={setAreChildLinksOpen}
        currentChildren={currentChildren}
      />
    </nav>
  );
};

export default Nav;
