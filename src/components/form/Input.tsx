import conditionalClasses from '@/lib/utils/conditionalClasses';

type InputProps = {
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  defaultValue?: string;
  className?: string;
  pattern?: string;
  required?: boolean;
};

export const INPUT_STYLE =
  'rounded border bg-secondary p-2 text-primary-light placeholder:text-secondary-dark focus:outline-2 focus:outline-tertiary';

const Input: React.FC<InputProps> = ({
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
      className={conditionalClasses(INPUT_STYLE, className)}
      required={required}
    />
  );
};

export default Input;
