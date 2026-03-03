'use client';

import conditionalClasses from '@/lib/utils/conditionalClasses';
import type { ReactNode, MouseEvent } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  ariaLabel: string;
  className?: string;
};

const Button = ({ children, onClick, ariaLabel, className }: ButtonProps) => {
  return (
    <button
      className={conditionalClasses(
        'rounded-lg bg-primary-dark p-2 shadow-md hover:bg-gray-200',
        className
      )}
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
};

export default Button;
