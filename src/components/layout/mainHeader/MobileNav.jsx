'use client';

import conditionalClasses from '@/lib/utils/conditionalClasses';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MobileSubNav from './MobileSubNav';
import { usePathname } from 'next/navigation';

const MobileNav = ({ linkData }) => {
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
    setAreChildLinksOpen(true);
    const theKids = linkData.filter(
      singleLinkData => singleLinkData.link.linkText === evt.currentTarget.id
    )[0];
    setCurrentChildren(theKids?.secondLevelLinks);
  };

  const mainLinks = linkData?.map(({ link, secondLevelLinks }) => {
    if (secondLevelLinks) {
      return (
        <li key={link.linkText} className="cursor-pointer">
          <button
            id={link.linkText}
            type="button"
            onClick={handleMainLinkClick}
            className="flex w-full cursor-pointer justify-between"
          >
            <span>{link.linkText}</span>
            <span>&rarr;</span>
          </button>
        </li>
      );
    }

    return (
      <li key={link.linkText} className="cursor-pointer">
        <Link href={`/${link.slug.current}`}>{link.linkText}</Link>
      </li>
    );
  });

  return (
    <nav className="block bg-cyan-600 sm:hidden">
      <div
        className="flex h-full cursor-pointer items-center px-5"
        onClick={handleHamburgerClick}
      >
        <span>X</span>
      </div>

      <ul
        className={conditionalClasses(
          'absolute left-1/6 flex w-5/6 translate-x-full flex-col bg-lime-900 transition-transform',
          areLinksOpen ? '-translate-x-0' : ''
        )}
      >
        {mainLinks}
      </ul>

      <MobileSubNav
        isOpen={areChildLinksOpen}
        setIsOpen={setAreChildLinksOpen}
        currentChildren={currentChildren}
      />
    </nav>
  );
};

export default MobileNav;
