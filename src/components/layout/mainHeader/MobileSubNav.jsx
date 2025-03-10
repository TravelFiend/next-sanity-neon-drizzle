import { useState, Fragment, useEffect, useRef } from 'react';
import conditionalClasses from '@/lib/utils/conditionalClasses';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileSubNav = ({
  isOpen,
  setIsOpen,
  setAreChildrenOpen,
  currentChildren
}) => {
  const [expandedChild, setExpandedChild] = useState(null);
  const subNavRef = useRef();
  const pathName = usePathname();

  useEffect(() => {
    setExpandedChild(null);
  }, [pathName]);

  useEffect(() => {
    setIsOpen(true);
  }, [currentChildren, setIsOpen]);

  // useEffect(() => {
  //   const handleOutSideClick = evt => {
  //     if (!subNavRef.current?.contains(evt.target)) {
  //       setIsOpen(false);
  //     }
  //   };

  //   window.addEventListener('mousedown', handleOutSideClick);

  //   return () => {
  //     window.removeEventListener('mousedown', handleOutSideClick);
  //   };
  // }, [subNavRef, setIsOpen]);

  const handleBackClick = () => {
    setAreChildrenOpen(false);
    setExpandedChild(null);
  };

  const handleChildLinkClick = child => {
    setExpandedChild(prevExpanded => (prevExpanded === child ? null : child));
  };

  return (
    <ul
      className={conditionalClasses(
        'absolute left-1/6 flex w-5/6 translate-x-full flex-col bg-red-700 transition-transform sm:hidden',
        isOpen ? '-translate-x-0' : ''
      )}
      ref={subNavRef}
    >
      <li className="cursor-pointer" onClick={handleBackClick}>
        &larr; Back
      </li>

      {currentChildren?.map(({ _key, secondLevelLink, thirdLevelLinks }) => {
        const childSlug = secondLevelLink.internalLink.slug.current;
        const childText = secondLevelLink.internalLink.linkText;

        return (
          <Fragment key={_key}>
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
                    ({ _key: grandChildKey, internalLink }) => (
                      <Link
                        key={grandChildKey}
                        href={`/${childSlug}/${internalLink.slug.current}`}
                      >
                        {internalLink.linkText}
                      </Link>
                    )
                  )}
                </ul>
              </li>
            ) : (
              <Link className="mr-4" href={`/${childSlug}`}>
                {childText}
              </Link>
            )}
          </Fragment>
        );
      })}
    </ul>
  );
};

export default MobileSubNav;
