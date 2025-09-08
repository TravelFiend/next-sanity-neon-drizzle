import { SecondLevelLinksRes } from '@/sanity/types/derivedTypes';
import MobileSecondLinks from './MobileSecondLinks';
import AccountIcon from '@/components/icons/AccountIcon';
import { User } from '@/auth/session.server';
import conditionalClasses from '@/lib/utils/conditionalClasses';

type MobileNavProps = {
  user?: User | null;
  areLinksOpen: boolean;
  setAreLinksOpen: (areLinksOpen: boolean) => void;
  areChildLinksOpen: boolean;
  setAreChildLinksOpen: (areChildLinksOpen: boolean) => void;
  parentLink?: string;
  currentChildren?: SecondLevelLinksRes;
  mainLinks?: React.JSX.Element[];
  handleAccountIconClick: () => void;
};

const MobileNav: React.FC<MobileNavProps> = ({
  user,
  areLinksOpen,
  areChildLinksOpen,
  setAreLinksOpen,
  setAreChildLinksOpen,
  parentLink,
  currentChildren,
  mainLinks,
  handleAccountIconClick
}) => {
  const handleBurgerClick = () => {
    if (areLinksOpen) {
      setAreLinksOpen(false);
      setAreChildLinksOpen(false);
    } else {
      setAreLinksOpen(true);
    }
  };

  return (
    <>
      <button
        className="group flex h-full cursor-pointer flex-col items-center justify-center px-5"
        onClick={handleBurgerClick}
        aria-label="Open navigation menu"
      >
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="my-0.5 h-1 w-9 rounded-2xl bg-primary-dark transition-all duration-100 group-hover:bg-highlight"
          />
        ))}
      </button>

      <ul
        className={conditionalClasses(
          'absolute left-1/6 flex w-5/6 flex-col justify-center bg-lime-900 transition-transform',
          areLinksOpen ? '-translate-x-0' : 'translate-x-full'
        )}
      >
        <li className="m-3 flex h-5 items-center">
          <button
            type="button"
            className="flex cursor-pointer items-center hover:text-secondary"
            onClick={handleAccountIconClick}
          >
            <AccountIcon className="h-7" />
            <span>{user ? 'Account' : 'Signup/Login'}</span>
          </button>
        </li>

        {/* {mainLinks} */}
      </ul>

      <MobileSecondLinks
        isOpen={areChildLinksOpen}
        setIsOpen={setAreLinksOpen}
        setAreChildrenOpen={setAreChildLinksOpen}
        parentLink={parentLink}
        currentChildren={currentChildren}
      />
    </>
  );
};

export default MobileNav;
