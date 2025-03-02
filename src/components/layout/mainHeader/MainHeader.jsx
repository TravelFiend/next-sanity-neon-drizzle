import Link from 'next/link';

const MainHeader = async ({ navData }) => {
  if (!navData) return null;

  const mainLinks = navData.navTabs?.map(({ link, secondLevelLinks }) => {
    if (secondLevelLinks) {
      return (
        <li className="mr-4" key={link.linkText}>
          <button type="button">{link.linkText}</button>
        </li>
      );
    }

    return (
      <Link className="mr-4" key={link.linkText} href={`/${link.slug.current}`}>
        {link.linkText}
      </Link>
    );
  });

  return (
    <header className="fixed flex w-full justify-between">
      <Link href="/">
        <div
          className="size-12 sm:size-20"
          dangerouslySetInnerHTML={{ __html: navData.companyLogo }}
        />
      </Link>

      <nav>
        <ul className="flex">{mainLinks}</ul>
      </nav>
    </header>
  );
};

export default MainHeader;
