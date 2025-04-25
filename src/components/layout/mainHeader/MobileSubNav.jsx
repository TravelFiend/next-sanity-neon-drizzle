import { useState, Fragment, useEffect } from 'react';
import conditionalClasses from '@/lib/utils/conditionalClasses';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileSubNav = ({
  isOpen,
  setIsOpen,
  setAreChildrenOpen,
  parentLink,
  currentChildren
}) => {
  const [expandedChild, setExpandedChild] = useState(null);
  const pathName = usePathname();

  useEffect(() => {
    setExpandedChild(null);
  }, [pathName]);

  useEffect(() => {
    setIsOpen(true);
  }, [currentChildren, setIsOpen]);

  const handleBackClick = () => {
    setAreChildrenOpen(false);
    setExpandedChild(null);
  };

  const handleChildLinkClick = child => {
    setExpandedChild(prevExpanded =>
      prevExpanded?.thirdLevelLinks === child.thirdLevelLinks ? null : child
    );
  };

  return (
    <ul
      className={conditionalClasses(
        'absolute left-1/6 flex w-5/6 translate-x-full flex-col bg-red-700 transition-transform sm:hidden',
        isOpen ? '-translate-x-0' : ''
      )}
    >
      <li className="cursor-pointer" onClick={handleBackClick}>
        &larr; Back
      </li>

      {currentChildren?.map(
        ({ _key, secondLevelLink, thirdLevelLinks }, idx) => {
          const childSlug = secondLevelLink.internalLink.slug.current;
          const childText = secondLevelLink.internalLink.linkText;

          return (
            <Fragment key={_key}>
              {idx === 0 ? (
                <li className="font-semibold">
                  <Link href={`/${parentLink}`}>
                    BROWSE ALL {parentLink.toUpperCase()}
                  </Link>
                </li>
              ) : null}
              {thirdLevelLinks ? (
                <li>
                  <button
                    type="button"
                    onClick={() =>
                      handleChildLinkClick({ _key, thirdLevelLinks })
                    }
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
                  >
                    {thirdLevelLinks.map(
                      ({ _key: grandChildKey, internalLink }, idx) => (
                        <Fragment key={grandChildKey}>
                          {idx === 0 ? (
                            <Link
                              href={`/${parentLink}/${childSlug}`}
                              className="font-semibold"
                            >
                              BROWSE ALL {childText.toUpperCase()}
                            </Link>
                          ) : null}
                          <Link
                            href={`/${parentLink}/${childSlug}/${internalLink.slug.current}`}
                          >
                            {internalLink.linkText}
                          </Link>
                        </Fragment>
                      )
                    )}
                  </ul>
                </li>
              ) : (
                <Link className="mr-4" href={`/${parentLink}/${childSlug}`}>
                  {childText}
                </Link>
              )}
            </Fragment>
          );
        }
      )}
    </ul>
  );
};

export default MobileSubNav;
