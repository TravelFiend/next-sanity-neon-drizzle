'use client';

// import conditionalClasses from '@/lib/utils/conditionalClasses';
import Link from 'next/link';
import { useEffect, useState } from 'react';
// import MobileSecondLinks from './MobileSecondLinks';
import { redirect, usePathname } from 'next/navigation';
// import DesktopSubNav from './DesktopSubNav';
import type {
  NavTabsRes,
  SecondLevelLinksRes
} from '@sanityTypes/derivedTypes';
// import AccountIcon from '@/components/icons/AccountIcon';
import { type User } from '@/auth/session.server';
import useViewportWidth from '@/lib/hooks/useViewportWidth';
import MobileNav from './mobile/MobileNav';
import DesktopNav from './desktop/DesktopNav';

type LinkDataProps = {
  linkData?: NavTabsRes;
  user?: User | null;
};

const GlobalNav: React.FC<LinkDataProps> = ({ linkData, user }) => {
  const breakpoint = useViewportWidth();
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

  // const handleBurgerClick = () => {
  //   if (areLinksOpen) {
  //     setAreLinksOpen(false);
  //     setAreChildLinksOpen(false);
  //   } else {
  //     setAreLinksOpen(true);
  //   }
  // };

  const handleAccountIconClick = () => {
    return user ? redirect(`/account/${user.id}`) : redirect('/signup');
  };

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
    return (
      <li
        key={_key}
        id={link?.internalLink?.linkText}
        className="flex h-full w-full list-none"
      >
        {secondLevelLinks ? (
          <button
            id={link?.internalLink?.linkText}
            className="w-full cursor-pointer items-center text-start hover:text-secondary sm:mr-1 sm:px-4"
            onClick={handleMainLinkClick}
          >
            <span>{link?.internalLink?.linkText}</span>
            <span className="sm:hidden">&rarr;</span>
          </button>
        ) : (
          <Link
            href={`/${link?.internalLink?.slug?.current || ''}`}
            className="w-full"
          >
            {' '}
            {link?.internalLink?.linkText}
          </Link>
        )}
      </li>
    );
  });

  return (
    <nav className="block h-full bg-cyan-600">
      {breakpoint === 'xs' ? (
        <MobileNav
          user={user}
          areLinksOpen={areLinksOpen}
          setAreLinksOpen={setAreLinksOpen}
          areChildLinksOpen={areChildLinksOpen}
          setAreChildLinksOpen={setAreChildLinksOpen}
          parentLink={parentLink}
          currentChildren={currentChildren}
          mainLinks={mainLinks}
          handleAccountIconClick={handleAccountIconClick}
        />
      ) : (
        <DesktopNav
          user={user}
          areChildLinksOpen={areChildLinksOpen}
          setAreChildLinksOpen={setAreChildLinksOpen}
          parentLink={parentLink}
          currentChildren={currentChildren}
          mainLinks={mainLinks}
          handleAccountIconClick={handleAccountIconClick}
        />
      )}
      {/* <button
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
      </button> */}

      {/* <ul
        className={conditionalClasses(
          'absolute left-1/6 flex w-5/6 flex-col justify-center bg-lime-900 transition-transform sm:static sm:left-0 sm:h-full sm:w-full sm:translate-x-0 sm:flex-row sm:items-center',
          areLinksOpen ? '-translate-x-0' : 'translate-x-full'
        )}
      >
        <li className="m-3 flex h-5 items-center sm:hidden">
          <button
            type="button"
            className="flex cursor-pointer items-center hover:text-secondary"
            onClick={handleAccountIconClick}
          >
            <AccountIcon className="h-7" />
            <span>{user ? 'Account' : 'Signup/Login'}</span>
          </button>
        </li>

        {mainLinks}

        <li className="hidden h-20 px-3 sm:flex">
          <button
            type="button"
            className="flex cursor-pointer items-center hover:text-secondary"
            onClick={handleAccountIconClick}
          >
            <span>{user ? 'Account' : 'Signup/Login'}</span>
            <AccountIcon className="h-8" />
          </button>
        </li>
      </ul> */}

      {/* <MobileSecondLinks
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
      /> */}
    </nav>
  );
};

export default GlobalNav;
