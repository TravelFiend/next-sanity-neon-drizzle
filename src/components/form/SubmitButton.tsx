import conditionalClasses from '@/lib/utils/conditionalClasses';

type SubmitButtonProps = {
  isPending: boolean;
  className?: string;
};

const SubmitButton = ({ isPending, className }: SubmitButtonProps) => {
  return (
    <button
      type="submit"
      className={conditionalClasses(
        'rounded-lg border border-accent-dark p-4 text-primary-light active:bg-secondary-dark active:text-white',
        className
      )}
    >
      {isPending ? 'Submitting...' : 'Submit'}
    </button>
  );
};

export default SubmitButton;
