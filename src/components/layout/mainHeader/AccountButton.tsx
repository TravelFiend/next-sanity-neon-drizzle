'use client';

import AccountIcon from '@/components/icons/AccountIcon';
import conditionalClasses from '@/lib/utils/conditionalClasses';
import Link from 'next/link';

type AccountButtonProps = {
  isMobile: boolean;
  user?: boolean;
};

const AccountButton = ({ isMobile, user }: AccountButtonProps) => {
  return (
    <li>
      <Link
        href={user ? '/account' : '/signup'}
        className={conditionalClasses(
          'flex cursor-pointer items-center hover:text-secondary',
          isMobile
            ? 'm-3 flex h-5 sm:hidden'
            : 'hidden h-20 flex-row-reverse px-3 sm:flex'
        )}
      >
        <AccountIcon className="h-7" />
        <span>{user ? 'Account' : 'Signup/Login'}</span>
      </Link>
    </li>
  );
};

export default AccountButton;
