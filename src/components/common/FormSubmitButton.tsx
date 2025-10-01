type FormSubmitButtonProps = {
  isPending: boolean;
};

const FormSubmitButton: React.FC<FormSubmitButtonProps> = ({ isPending }) => {
  return (
    <button
      type="submit"
      className="rounded-lg border border-accent-dark p-4 text-primary-light active:bg-secondary-dark active:text-white"
    >
      {isPending ? 'Submitting...' : 'Submit'}
    </button>
  );
};

export default FormSubmitButton;
