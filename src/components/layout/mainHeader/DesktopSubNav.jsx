import conditionalClasses from '@/lib/utils/conditionalClasses';
import Link from 'next/link';

const DesktopSubNav = ({ isOpen, currentChildren }) => {
  if (!currentChildren) return null;

  return (
    <div
      className={conditionalClasses(
        'absolute top-16 left-1/2 hidden h-72 w-11/12 -translate-x-1/2 flex-col flex-wrap bg-green-400 break-words transition-opacity sm:flex',
        isOpen ? 'opacity-100' : 'opacity-0'
      )}
    >
      {currentChildren.map(({ _key, secondLevelLink, thirdLevelLinks }) => {
        const childSlug = secondLevelLink.internalLink.slug.current;
        const childText = secondLevelLink.internalLink.linkText;

        return (
          <div key={_key} className="mb-3 flex flex-col flex-wrap">
            <Link href={`/${childSlug}`}>
              <span className="block font-semibold">{childText}</span>
            </Link>

            {thirdLevelLinks && (
              <ul key={childText}>
                {thirdLevelLinks.map(
                  ({ _key: grandChildKey, internalLink }) => (
                    <li key={grandChildKey}>
                      <Link href={`/${childSlug}/${internalLink.slug.current}`}>
                        <span className="block">{internalLink.linkText}</span>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DesktopSubNav;
