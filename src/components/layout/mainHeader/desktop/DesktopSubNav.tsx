'use client';

import { Fragment, useEffect } from 'react';
import Link from 'next/link';
import useHoverState from '@/lib/hooks/useHoverState';
import conditionalClasses from '@/lib/utils/conditionalClasses';
import { BaseSubNavProps } from '../Nav';

const DesktopSubNav: React.FC<BaseSubNavProps> = ({
  isOpen,
  setIsOpen,
  parentLink,
  currentChildren
}) => {
  const { isHovered, onMouseEnter, onMouseLeave } = useHoverState();

  useEffect(() => {
    if (!isHovered) {
      setIsOpen(false);
    }
  }, [isHovered, setIsOpen]);

  useEffect(() => {
    setIsOpen(true);
  }, [currentChildren, setIsOpen]);

  const handleMouseLeave = () => {
    onMouseLeave();
    setIsOpen(false);
  };

  if (!currentChildren) return null;

  return (
    <div
      onMouseEnter={onMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={conditionalClasses(
        'absolute top-16 left-1/2 hidden h-72 w-11/12 -translate-x-1/2 flex-col flex-wrap bg-green-400 break-words transition-opacity sm:flex',
        isOpen ? 'opacity-100' : 'opacity-0'
      )}
    >
      {currentChildren.map(
        ({ _key, secondLevelLink, thirdLevelLinks }, idx) => {
          const childSlug = secondLevelLink.internalLink?.slug.current;
          const childText = secondLevelLink.internalLink?.linkText;

          return (
            <Fragment key={_key}>
              {idx === 0 ? (
                <Link href={`/${parentLink}`} className="font-semibold">
                  BROWSE ALL {parentLink?.toUpperCase()}
                </Link>
              ) : null}
              <div className="mb-3 flex flex-col flex-wrap">
                <Link href={`/${parentLink}/${childSlug}`}>
                  <span className="block font-semibold">{childText}</span>
                </Link>

                {thirdLevelLinks && (
                  <ul key={childText}>
                    {thirdLevelLinks.map(
                      ({ _key: grandChildKey, internalLink }) => (
                        <li key={grandChildKey}>
                          <Link
                            href={`/${parentLink}/${childSlug}/${internalLink?.slug.current}`}
                          >
                            <span className="block">
                              {internalLink?.linkText}
                            </span>
                          </Link>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
            </Fragment>
          );
        }
      )}
    </div>
  );
};

export default DesktopSubNav;
