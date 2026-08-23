import conditionalClasses from '@/lib/utils/conditionalClasses';
import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
}

export const INPUT_STYLE =
  'rounded border bg-secondary p-2 text-primary-light placeholder:text-secondary-dark focus:outline-2 focus:outline-tertiary';

const Input = ({
  id,
  name,
  type = 'text',
  className,
  required = true,
  ...props
}: InputProps) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      required={required}
      className={conditionalClasses(INPUT_STYLE, className)}
      {...props}
    />
  );
};

export default Input;
