import conditionalClasses from '@/lib/utils/conditionalClasses';

type FormLabelProps = {
  htmlFor: string;
  labelText: string;
  className?: string;
  required?: boolean;
};

const FormLabel = ({
  htmlFor,
  labelText,
  className,
  required = true
}: FormLabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className={conditionalClasses(
        'flex items-center font-sans text-primary-light capitalize',
        className
      )}
    >
      {required && <span className="pr-2 text-error">*</span>}
      {labelText}:{' '}
    </label>
  );
};

export default FormLabel;
