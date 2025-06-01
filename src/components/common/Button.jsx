import conditionalClasses from '@/lib/utils/conditionalClasses';

const Button = ({ onClick, label, ariaLabel, className }) => {
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
