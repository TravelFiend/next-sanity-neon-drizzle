'use client';

import Link from 'next/link';
import { useState } from 'react';
import DesktopSubNav from './DesktopSubNav';

const DesktopNav = ({ linkData }) => {
  const [areChildLinksOpen, setAreChildLinksOpen] = useState(false);
  const [currentChildren, setCurrentChildren] = useState(null);

  const handleMainLinkClick = evt => {
    setAreChildLinksOpen(!areChildLinksOpen);
    const theKids = linkData.filter(
      singleLinkData => singleLinkData.link.linkText === evt.currentTarget.id
    )[0];
    setCurrentChildren(theKids.secondLevelLinks);
  };

  const mainLinks = linkData?.map(({ link, secondLevelLinks }) => {
    if (secondLevelLinks) {
      return (
        <li key={link.linkText} className="mr-1 list-none px-4">
          <button
            id={link.linkText}
            type="button"
            onClick={handleMainLinkClick}
            className="cursor-pointer"
          >
            {link.linkText}
          </button>
        </li>
      );
    }

    return (
      <li key={link.linkText} className="mr-1 cursor-pointer px-4">
        <Link href={`/${link.slug.current}`}>{link.linkText}</Link>
      </li>
    );
  });

  return (
    <nav className="hidden bg-green-500 sm:block">
      <ul className="flex h-full items-center justify-center">{mainLinks}</ul>

      {currentChildren ? (
        <DesktopSubNav currentChildren={currentChildren} />
      ) : null}
    </nav>
  );
};

export default DesktopNav;
