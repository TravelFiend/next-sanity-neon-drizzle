'use client';

import conditionalClasses from '@/lib/utils/conditionalClasses';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import MobileSecondLinks from './MobileSecondLinks';
import { usePathname } from 'next/navigation';
import DesktopSubNav from './DesktopSubNav';
import type {
  NavTabsRes,
  SecondLevelLinksRes
} from '@sanityTypes/derivedTypes';

type LinkDataProps = {
  linkData?: NavTabsRes;
};

const Nav: React.FC<LinkDataProps> = ({ linkData }) => {
  const [areLinksOpen, setAreLinksOpen] = useState(false);
  const [areChildLinksOpen, setAreChildLinksOpen] = useState(false);
  const [parentLink, setParentLink] = useState<string | undefined>(undefined);
  const [currentChildren, setCurrentChildren] =
    useState<SecondLevelLinksRes | null>(null);
  const pathName = usePathname();

  useEffect(() => {
    setAreLinksOpen(false);
    setAreChildLinksOpen(false);
  }, [pathName]);

  const handleBurgerClick = () => {
    if (areLinksOpen) {
      setAreLinksOpen(false);
      setAreChildLinksOpen(false);
    } else {
      setAreLinksOpen(true);
    }
  };

  if (!linkData) return null;

  const handleMainLinkClick = (evt: React.MouseEvent<HTMLElement>) => {
    const theKids = linkData?.filter(
      singleLinkData =>
        singleLinkData?.link?.internalLink?.linkText === evt.currentTarget.id
    )?.[0];

    if (theKids?.secondLevelLinks === currentChildren) {
      setAreChildLinksOpen(!areChildLinksOpen);
    }

    setCurrentChildren(theKids?.secondLevelLinks || null);
    setParentLink(evt.currentTarget.id.toLowerCase());
  };

  const mainLinks = linkData?.map(({ _key, link, secondLevelLinks }) => {
    if (secondLevelLinks) {
      return (
        <li
          key={_key}
          id={link?.internalLink?.linkText || ''}
          className="flex h-full w-full list-none"
        >
          <button
            id={link?.internalLink?.linkText || ''}
            className="w-full cursor-pointer items-center text-start hover:text-secondary sm:mr-1 sm:px-4"
            onClick={handleMainLinkClick}
          >
            <span>{link?.internalLink?.linkText}</span>
            <span className="sm:hidden">&rarr;</span>
          </button>
        </li>
      );
    }

    return (
      <li
        key={_key}
        className="flex h-full cursor-pointer items-center hover:text-secondary sm:mr-1 sm:px-4"
      >
        <Link
          href={`/${link?.internalLink?.slug?.current || ''}`}
          className="w-full"
        >
          {' '}
          {/* Provide fallback for href */}
          {link?.internalLink?.linkText}
        </Link>
      </li>
    );
  });

  return (
    <nav className="block h-full bg-cyan-600">
      {linkData?.length ? (
        <button
          className="group flex h-full cursor-pointer flex-col items-center justify-center px-5 sm:hidden"
          onClick={handleBurgerClick}
          aria-label="Open navigation menu"
        >
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="my-0.5 h-1 w-9 rounded-2xl bg-primary-dark transition-all duration-100 group-hover:bg-highlight"
            />
          ))}
        </button>
      ) : null}

      <ul
        className={conditionalClasses(
          'absolute left-1/6 flex w-5/6 translate-x-full flex-col justify-center bg-lime-900 transition-transform sm:static sm:left-0 sm:h-full sm:w-full sm:translate-x-0 sm:flex-row sm:items-center',
          areLinksOpen ? '-translate-x-0' : ''
        )}
      >
        {mainLinks}
      </ul>

      <MobileSecondLinks
        isOpen={areChildLinksOpen}
        setIsOpen={setAreLinksOpen}
        setAreChildrenOpen={setAreChildLinksOpen}
        parentLink={parentLink}
        currentChildren={currentChildren}
      />
      <DesktopSubNav
        isOpen={areChildLinksOpen}
        setIsOpen={setAreChildLinksOpen}
        parentLink={parentLink}
        currentChildren={currentChildren}
      />
    </nav>
  );
};

export default Nav;
