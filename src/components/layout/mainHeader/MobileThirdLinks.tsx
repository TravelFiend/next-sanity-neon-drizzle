import { Fragment } from 'react';
import Link from 'next/link';
import type { ThirdLevelLinkRes } from '@sanityTypes/derivedTypes';
import conditionalClasses from '@/lib/utils/conditionalClasses';

type MobileThirdLinksProps = {
  thirdLevelLinks: ThirdLevelLinkRes;
  parentLink: string;
  childSlug: string;
  childText?: string;
  isOpen: boolean;
};

const MobileThirdLinks: React.FC<MobileThirdLinksProps> = ({
  thirdLevelLinks,
  parentLink,
  childSlug,
  childText,
  isOpen
}) => {
  return (
    <ul
      className={conditionalClasses(
        'w-full flex-col bg-fuchsia-900 transition-all',
        isOpen ? 'flex' : 'hidden'
      )}
      aria-hidden={!isOpen}
      data-testid="thirdLinks"
    >
      {thirdLevelLinks.map(({ _key: grandChildKey, internalLink }, idx) => (
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
      ))}
    </ul>
  );
};

export default MobileThirdLinks;
