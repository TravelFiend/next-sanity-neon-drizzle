'use client';

import { useState, Fragment, useEffect } from 'react';
import conditionalClasses from '@/lib/utils/conditionalClasses';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type {
  SecondLevelLinksRes,
  SingleSecondLevelLinkRes
} from '@sanityTypes/derivedTypes';
import MobileThirdLinks from './MobileThirdLinks';

type MobileSecondLinksProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setAreChildrenOpen: (areChildrenOpen: boolean) => void;
  parentLink?: string;
  currentChildren?: SecondLevelLinksRes;
};

const MobileSecondLinks: React.FC<MobileSecondLinksProps> = ({
  isOpen,
  setIsOpen,
  setAreChildrenOpen,
  parentLink,
  currentChildren
}) => {
  const [expandedChild, setExpandedChild] =
    useState<SingleSecondLevelLinkRes | null>(null);

  const pathName = usePathname();

  useEffect(() => {
    setExpandedChild(null);
  }, [pathName]);

  useEffect(() => {
    return currentChildren ? setIsOpen(true) : setIsOpen(false);
  }, [currentChildren, setIsOpen]);

  const handleBackClick = () => {
    setAreChildrenOpen(false);
    setExpandedChild(null);
  };

  const handleChildLinkClick = (child: SingleSecondLevelLinkRes) => {
    setExpandedChild(prevExpanded =>
      prevExpanded?.thirdLevelLinks === child.thirdLevelLinks ? null : child
    );
  };

  return (
    <ul
      className={conditionalClasses(
        'absolute left-1/6 flex w-5/6 flex-col bg-red-700 transition-transform sm:hidden',
        isOpen ? '-translate-x-0' : 'translate-x-full'
      )}
    >
      <li className="cursor-pointer">
        <button className="w-full text-start" onClick={handleBackClick}>
          &larr; Back
        </button>
      </li>

      {currentChildren?.map((child, idx) => {
        if (!child) return null;

        const { _key, secondLevelLink, thirdLevelLinks } = child;

        const childSlug = secondLevelLink?.internalLink?.slug?.current;
        const childText = secondLevelLink?.internalLink?.linkText;

        return (
          <Fragment key={_key}>
            {idx === 0 && parentLink ? (
              <li className="font-semibold">
                <Link href={`/${parentLink}`}>
                  BROWSE ALL {parentLink.toUpperCase()}
                </Link>
              </li>
            ) : null}
            {thirdLevelLinks && parentLink && childSlug ? (
              <li>
                <button
                  onClick={() => handleChildLinkClick(child)}
                  className="flex w-full cursor-pointer justify-between"
                >
                  <span>{childText}</span>
                  <span>&darr;</span>
                </button>

                <MobileThirdLinks
                  thirdLevelLinks={thirdLevelLinks}
                  childSlug={childSlug}
                  parentLink={parentLink}
                  childText={childText}
                  isOpen={expandedChild?._key === _key}
                />
              </li>
            ) : (
              <li>
                <Link
                  className="mr-4"
                  href={`/${parentLink}/${childSlug || ''}`}
                >
                  {childText}
                </Link>
              </li>
            )}
          </Fragment>
        );
      })}
    </ul>
  );
};

export default MobileSecondLinks;
