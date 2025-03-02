'use client';

import conditionalClasses from '@/lib/utils/conditionalClasses';
import Link from 'next/link';
import { useState } from 'react';

const MobileNav = ({ linkData }) => {
  const [areLinksOpen, setAreLinksOpen] = useState(false);
  const [areChildLinksOpen, setAreChildLinksOpen] = useState(false);
  const [currentChildren, setCurrentChildren] = useState(null);
  const [areGrandChildLinksOpen, setAreGrandChildLinksOpen] = useState(false);
  const [currentGrandChildren, setCurrentGrandChildren] = useState(null);

  const handleHamburgerClick = () => {
    setAreLinksOpen(!areLinksOpen);
    setAreChildLinksOpen(false);
  };

  const mainLinks = linkData?.map(({ link, secondLevelLinks }) => {
    const handleMainLinkClick = evt => {
      setAreChildLinksOpen(true);
      const theKids = linkData.filter(
        singleLinkData => singleLinkData.link.linkText === evt.target.id
      )[0];
      setCurrentChildren(theKids?.secondLevelLinks);
    };

    if (secondLevelLinks) {
      return (
        <li key={link.linkText} className="mr-4">
          <button
            id={link.linkText}
            type="button"
            onClick={handleMainLinkClick}
          >
            {link.linkText}
          </button>
        </li>
      );
    }

    return (
      <Link className="mr-4" key={link.linkText} href={`/${link.slug.current}`}>
        {link.linkText}
      </Link>
    );
  });

  const secondLevelLinks = currentChildren?.map(
    ({ secondLevelLink, thirdLevelLinks }) => {
      const handleChildLinkClick = evt => {
        const theGrandKids = currentChildren.filter(
          child => child.secondLevelLink.linkText === evt.target.id
        )[0];
        setCurrentGrandChildren(theGrandKids.thirdLevelLinks);
        setAreGrandChildLinksOpen(!areGrandChildLinksOpen);
      };

      if (thirdLevelLinks) {
        return (
          <li key={secondLevelLink.linkText} className="">
            <button
              id={secondLevelLink.linkText}
              type="button"
              onClick={handleChildLinkClick}
            >
              {secondLevelLink.linkText} &darr;
            </button>

            <ul
              className={conditionalClasses(
                'w-full flex-col bg-fuchsia-900',
                thirdLevelLinks === currentGrandChildren &&
                  areGrandChildLinksOpen
                  ? 'flex'
                  : 'hidden'
              )}
            >
              {thirdLevelLinks.map(finalLink => {
                return (
                  <Link
                    key={finalLink.linkText}
                    href={`/${secondLevelLink.linkText.toLowerCase()}/${finalLink.linkText.toLowerCase()}`}
                  >
                    {finalLink.linkText}
                  </Link>
                );
              })}
            </ul>
          </li>
        );
      }

      return (
        <Link
          className="mr-4"
          key={secondLevelLink.linkText}
          href={`/${secondLevelLink.slug.current}`}
        >
          {secondLevelLink.linkText}
        </Link>
      );
    }
  );

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

      <ul
        className={conditionalClasses(
          'absolute left-1/6 flex w-5/6 translate-x-full flex-col bg-slate-400 transition-transform',
          areChildLinksOpen ? '-translate-x-0' : ''
        )}
      >
        <li onClick={() => setAreChildLinksOpen(false)}>&larr; Back</li>
        {secondLevelLinks}
      </ul>
    </nav>
  );
};

export default MobileNav;
