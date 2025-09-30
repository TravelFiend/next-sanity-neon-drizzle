import FormInput from './FormInput';
import FormLabel from './FormLabel';

type FormFieldProps = {
  forIdName: string;
  labelText: string;
  inputType?: string;
  placeholder?: string;
  inputClassName?: string;
  required?: boolean;
};

const FormField: React.FC<FormFieldProps> = ({
  forIdName,
  labelText,
  inputType,
  placeholder,
  inputClassName,
  required = true
}) => {
  return (
    <>
      <FormLabel
        htmlFor={forIdName}
        labelText={labelText}
        className="mb-2"
        required={required}
      />
      <FormInput
        type={inputType}
        id={forIdName}
        name={forIdName}
        placeholder={placeholder}
        className={inputClassName}
        required={required}
      />
    </>
  );
};

export default FormField;
