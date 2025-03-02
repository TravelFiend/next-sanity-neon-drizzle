import Link from 'next/link';

const DesktopNav = ({ linkData }) => {
  const mainLinks = linkData?.map(({ link, secondLevelLinks }) => {
    if (secondLevelLinks) {
      return (
        <li className="mr-1 list-none px-4" key={link.linkText}>
          <button type="button">{link.linkText}</button>
        </li>
      );
    }

    return (
      <li className="mr-1 px-4" key={link.linkText}>
        <Link href={`/${link.slug.current}`}>{link.linkText}</Link>
      </li>
    );
  });

  return (
    <nav className="hidden bg-green-500 sm:block">
      <ul className="flex h-full items-center justify-center">{mainLinks}</ul>
    </nav>
  );
};

export default DesktopNav;
