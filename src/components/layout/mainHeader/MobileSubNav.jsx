import { useState, Fragment, useEffect } from 'react';
import conditionalClasses from '@/lib/utils/conditionalClasses';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileSubNav = ({ isOpen, setIsOpen, currentChildren }) => {
  const [areGrandChildLinksOpen, setAreGrandChildLinksOpen] = useState(false);
  const [currentGrandChildren, setCurrentGrandChildren] = useState(null);
  const pathName = usePathname();

  useEffect(() => {
    setAreGrandChildLinksOpen(false);
  }, [pathName]);

  const handleBackClick = () => {
    setIsOpen(false);
    setAreGrandChildLinksOpen(false);
  };

  const handleChildLinkClick = evt => {
    const theGrandKids = currentChildren.filter(
      child => child.secondLevelLink.linkText === evt.currentTarget.id
    )[0];

    setAreGrandChildLinksOpen(prevState =>
      currentGrandChildren === theGrandKids.thirdLevelLinks ? !prevState : true
    );

    setCurrentGrandChildren(theGrandKids.thirdLevelLinks);
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

      {currentChildren?.map(({ _key, secondLevelLink, thirdLevelLinks }) => {
        return (
          <Fragment key={_key}>
            {thirdLevelLinks ? (
              <li>
                <button
                  id={secondLevelLink.linkText}
                  type="button"
                  onClick={handleChildLinkClick}
                  className="flex w-full cursor-pointer justify-between"
                >
                  <span>{secondLevelLink.linkText}</span>
                  <span>&darr;</span>
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
                  {thirdLevelLinks.map(({ _key, linkText, slug }) => (
                    <Link
                      key={_key}
                      href={`/${secondLevelLink.slug.current}/${slug.current}`}
                    >
                      {linkText}
                    </Link>
                  ))}
                </ul>
              </li>
            ) : (
              <Link className="mr-4" href={`/${secondLevelLink.slug.current}`}>
                {secondLevelLink.linkText}
              </Link>
            )}
          </Fragment>
        );
      })}
    </ul>
  );
};

export default MobileSubNav;
