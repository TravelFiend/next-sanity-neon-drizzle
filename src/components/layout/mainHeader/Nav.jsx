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
    const theKids = linkData.filter(
      singleLinkData =>
        singleLinkData.link.internalLink.linkText === evt.currentTarget.id
    )[0];

    if (theKids?.secondLevelLinks === currentChildren) {
      setAreChildLinksOpen(!areChildLinksOpen);
    }

    setCurrentChildren(theKids?.secondLevelLinks);
  };

  const mainLinks = linkData?.map(({ _key, link, secondLevelLinks }) => {
    if (secondLevelLinks) {
      return (
        <li
          key={_key}
          id={link.internalLink.linkText}
          className="flex h-full w-full cursor-pointer list-none items-center hover:text-secondary sm:mr-1 sm:px-4"
          onClick={handleMainLinkClick}
        >
          <span>{link.internalLink.linkText}</span>
          <span className="sm:hidden">&rarr;</span>
        </li>
      );
    }

    return (
      <li
        key={_key}
        className="flex h-full cursor-pointer items-center hover:text-secondary sm:mr-1 sm:px-4"
      >
        <Link href={`/${link.internalLink.slug.current}`}>
          {link.internalLink.linkText}
        </Link>
      </li>
    );
  });

  return (
    <nav className="block h-full bg-cyan-600">
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
        setIsOpen={setAreLinksOpen}
        setAreChildrenOpen={setAreChildLinksOpen}
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
