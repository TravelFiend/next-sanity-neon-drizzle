'use client';

import { useState, Fragment, useEffect } from 'react';
import conditionalClasses from '@/lib/utils/conditionalClasses';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type {
  SecondLevelLinksRes,
  SingleSecondLevelLinkRes
} from '@/sanity/types/derivedTypes';

type MobileSubNavProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setAreChildrenOpen: React.Dispatch<React.SetStateAction<boolean>>;
  parentLink?: string;
  currentChildren?: SecondLevelLinksRes;
};

const MobileSubNav: React.FC<MobileSubNavProps> = ({
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
            {thirdLevelLinks ? (
              <li>
                <button
                  onClick={() => handleChildLinkClick(child)}
                  className="flex w-full cursor-pointer justify-between"
                >
                  <span>{childText}</span>
                  <span>&darr;</span>
                </button>

                <ul
                  className={conditionalClasses(
                    'w-full flex-col bg-fuchsia-900',
                    expandedChild?._key === _key ? 'flex' : 'hidden'
                  )}
                  aria-hidden={expandedChild?._key === _key ? 'false' : 'true'}
                >
                  {thirdLevelLinks.map(
                    ({ _key: grandChildKey, internalLink }, idx) => (
                      <Fragment key={grandChildKey}>
                        {idx === 0 && parentLink && childSlug ? (
                          <>
                            <li key={grandChildKey}>
                              <Link
                                href={`/${parentLink}/${childSlug}`}
                                className="font-semibold"
                              >
                                BROWSE ALL {childText?.toUpperCase()}
                              </Link>
                            </li>
                            <li>
                              <Link
                                href={`/${parentLink}/${childSlug}/${internalLink?.slug?.current || ''}`}
                              >
                                {internalLink?.linkText}
                              </Link>
                            </li>
                          </>
                        ) : (
                          <li>
                            <Link
                              href={`/${parentLink}/${childSlug}/${internalLink?.slug?.current || ''}`}
                            >
                              {internalLink?.linkText}
                            </Link>
                          </li>
                        )}
                      </Fragment>
                    )
                  )}
                </ul>
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

export default MobileSubNav;
