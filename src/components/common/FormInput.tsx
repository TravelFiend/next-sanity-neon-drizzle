import conditionalClasses from '@/lib/utils/conditionalClasses';

type FormInputProps = {
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  required?: boolean;
};

const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  type = 'text',
  placeholder,
  defaultValue,
  className,
  required = true
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      defaultValue={defaultValue}
      className={conditionalClasses(
        'rounded border p-2 text-primary-light',
        className
      )}
      required={required}
    />
  );
};

export default FormInput;
