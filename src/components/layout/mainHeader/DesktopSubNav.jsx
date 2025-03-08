import conditionalClasses from '@/lib/utils/conditionalClasses';
import Link from 'next/link';

const DesktopSubNav = ({ isOpen, currentChildren }) => {
  if (!currentChildren) return null;

  const subLinks = currentChildren.map(
    ({ _key, secondLevelLink, thirdLevelLinks }) => {
      return thirdLevelLinks ? (
        <div key={_key} className="mb-3 flex flex-col flex-wrap">
          <Link href={`/${secondLevelLink.internalLink.slug.current}`}>
            <span className="block font-semibold">
              {secondLevelLink.internalLink.linkText}
            </span>
          </Link>

          <ul key={secondLevelLink.internalLink.linkText}>
            {thirdLevelLinks.map(({ _key, internalLink }) => (
              <li key={_key}>
                <Link href={`/${internalLink.slug.current}`}>
                  <span className="block">{internalLink.linkText}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Link
          key={secondLevelLink.internalLink.linkText}
          href={`/${secondLevelLink.internalLink.slug.current}`}
        >
          <span className="block font-semibold">
            {secondLevelLink.internalLink.linkText}
          </span>
        </Link>
      );
    }
  );

  return (
    <div
      className={conditionalClasses(
        'absolute top-16 left-1/2 hidden h-72 w-11/12 -translate-x-1/2 flex-col flex-wrap bg-green-400 break-words transition-opacity sm:flex',
        isOpen ? 'opacity-100' : 'opacity-0'
      )}
    >
      {subLinks}
    </div>
  );
};

export default DesktopSubNav;
