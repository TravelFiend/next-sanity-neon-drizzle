'use client';

import conditionalClasses from '@/lib/utils/conditionalClasses';
import type { ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  ariaLabel: string;
  className?: string;
  type?: 'submit' | 'reset' | 'button';
  disabled?: boolean;
};

const Button = ({
  children,
  onClick,
  ariaLabel,
  className,
  type = 'button',
  disabled = false
}: ButtonProps) => {
  return (
    <button
      className={conditionalClasses(
        'cursor-pointer rounded-lg bg-primary-dark p-2 shadow-md hover:bg-gray-200',
        className
      )}
      type={type}
      onClick={onClick}
      aria-label={ariaLabel}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
