import Link from 'next/link';

const MainHeader = () => {
  return (
    <header className="flex justify-between">
      <Link href="/">MJM LLC</Link>

      <nav>
        <ul className="flex">
          <li>
            <Link href="/about">About Us</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainHeader;
