import conditionalClasses from '@/lib/utils/conditionalClasses';

type ButtonProps = {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  label: string;
  ariaLabel: string;
  className: string;
};

const Button: React.FC<ButtonProps> = ({
  onClick,
  label,
  ariaLabel,
  className
}) => {
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
      {label}
    </button>
  );
};

export default Button;
