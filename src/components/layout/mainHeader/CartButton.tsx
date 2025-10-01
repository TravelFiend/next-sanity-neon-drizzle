'use client';

import { redirect } from 'next/navigation';
import CartIcon from '@/components/icons/CartIcon';
import conditionalClasses from '@/lib/utils/conditionalClasses';

type CartButtonProps = {
  isMobile: boolean;
};

const CartButton: React.FC<CartButtonProps> = ({ isMobile }) => {
  return (
    <li>
      <button
        aria-label="Link to checkout page"
        onClick={() => redirect('/checkout')}
        className={conditionalClasses(
          'cursor-pointer',
          isMobile
            ? 'm-3 flex h-5 sm:hidden'
            : 'hidden h-20 items-center px-3 sm:flex'
        )}
      >
        <CartIcon className="h-7" />
      </button>
    </li>
  );
};

export default CartButton;
