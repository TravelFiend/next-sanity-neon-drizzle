import { SecondLevelLinksRes } from '@/sanity/types/derivedTypes';
import DesktopSubNav from './DesktopSubNav';
import React from 'react';
import AccountIcon from '@/components/icons/AccountIcon';
import { User } from '@/auth/session.server';

type DesktopNavProps = {
  user?: User | null;
  areChildLinksOpen: boolean;
  setAreChildLinksOpen: (areChildLinksOpen: boolean) => void;
  parentLink?: string;
  currentChildren: SecondLevelLinksRes;
  mainLinks?: React.JSX.Element[];
  handleAccountIconClick: () => void;
};

const DesktopNav: React.FC<DesktopNavProps> = ({
  user,
  areChildLinksOpen,
  setAreChildLinksOpen,
  parentLink,
  currentChildren,
  mainLinks,
  handleAccountIconClick
}) => {
  return (
    <>
      <ul className="static left-0 flex h-full w-full items-center justify-center bg-lime-900 transition-transform">
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
      </ul>

      <DesktopSubNav
        isOpen={areChildLinksOpen}
        setIsOpen={setAreChildLinksOpen}
        parentLink={parentLink}
        currentChildren={currentChildren}
      />
    </>
  );
};

export default DesktopNav;
