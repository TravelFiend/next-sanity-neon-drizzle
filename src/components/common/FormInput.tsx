type FormInputProps = {
  id: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
};

const FormInput: React.FC<FormInputProps> = ({
  id,
  name,
  type = 'text',
  placeholder,
  required = true
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      placeholder={placeholder}
      required={required}
      className="rounded border p-2 text-primary-light"
    />
  );
};

export default FormInput;
