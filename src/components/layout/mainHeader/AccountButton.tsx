'use client';

import { redirect } from 'next/navigation';
import AccountIcon from '@/components/icons/AccountIcon';
import conditionalClasses from '@/lib/utils/conditionalClasses';

type AccountButtonProps = {
  isMobile: boolean;
  user?: boolean;
};

const AccountButton: React.FC<AccountButtonProps> = ({ isMobile, user }) => {
  const handleAccountIconClick = () => {
    return user ? redirect('/account') : redirect('/signup');
  };

  return (
    <li>
      <button
        aria-label={user ? 'Link to account page' : 'Link to signup/login'}
        onClick={handleAccountIconClick}
        className={conditionalClasses(
          'flex cursor-pointer items-center hover:text-secondary',
          isMobile
            ? 'm-3 flex h-5 sm:hidden'
            : 'hidden h-20 flex-row-reverse px-3 sm:flex'
        )}
      >
        <AccountIcon className="h-7" />
        <span>{user ? 'Account' : 'Signup/Login'}</span>
      </button>
    </li>
  );
};

export default AccountButton;
