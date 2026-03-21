import conditionalClasses from '@/lib/utils/conditionalClasses';

type SubmitButtonProps = {
  isPending: boolean;
  className?: string;
  disabled?: boolean;
};

const SubmitButton = ({
  isPending,
  className,
  disabled = false
}: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={conditionalClasses(
        'rounded-lg border border-accent-dark p-4 text-primary-light active:bg-secondary-dark active:text-white',
        disabled ? '' : 'bg-secondary-dark',
        className
      )}
    >
      {isPending ? 'Submitting...' : 'Submit'}
    </button>
  );
};

export default SubmitButton;
