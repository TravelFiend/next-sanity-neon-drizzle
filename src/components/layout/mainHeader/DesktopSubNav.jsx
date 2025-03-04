import conditionalClasses from '@/lib/utils/conditionalClasses';
import Link from 'next/link';

const DesktopSubNav = ({ isOpen, currentChildren }) => {
  if (!currentChildren) return null;

  const subLinks = currentChildren.map(
    ({ secondLevelLink, thirdLevelLinks }) => {
      return thirdLevelLinks ? (
        <div
          key={secondLevelLink.slug.current}
          className="mb-3 flex flex-col flex-wrap"
        >
          <Link href={`/${secondLevelLink.slug.current}`}>
            <span className="block font-semibold">
              {secondLevelLink.linkText}
            </span>
          </Link>

          <ul key={secondLevelLink.linkText}>
            {thirdLevelLinks.map(grandchildLink => (
              <li key={grandchildLink.slug.current}>
                <Link href={`/${grandchildLink.slug.current}`}>
                  <span className="block">{grandchildLink.linkText}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <Link
          key={secondLevelLink.linkText}
          href={`/${secondLevelLink.slug.current}`}
        >
          <span className="block font-semibold">
            {secondLevelLink.linkText}
          </span>
        </Link>
      );
    }
  );

  return (
    <div
      className={conditionalClasses(
        'absolute top-16 left-1/2 flex h-72 w-11/12 -translate-x-1/2 flex-col flex-wrap bg-green-400 break-words transition-opacity',
        isOpen ? 'opacity-100' : 'opacity-0'
      )}
    >
      {subLinks}
    </div>
  );
};

export default DesktopSubNav;
