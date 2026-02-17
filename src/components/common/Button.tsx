'use client';

import conditionalClasses from '@/lib/utils/conditionalClasses';

type ButtonProps = {
  children: React.ReactNode;
  onClick: () => void;
  ariaLabel: string;
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  ariaLabel,
  className
}) => {
  return (
    <button
      className={conditionalClasses(
        'cursor-pointer rounded-lg bg-primary-dark p-2 shadow-md hover:bg-gray-200',
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
