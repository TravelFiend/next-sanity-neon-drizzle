import Input from './Input';
import Label from './Label';

type InputWLabelProps = {
  forIdName: string;
  labelText: string;
  inputType?: string;
  placeholder?: string;
  defaultValue?: string;
  inputClassName?: string;
  required?: boolean;
};

const InputWLabel: React.FC<InputWLabelProps> = ({
  forIdName,
  labelText,
  inputType,
  placeholder,
  defaultValue,
  inputClassName,
  required = true
}) => {
  return (
    <>
      <Label
        htmlFor={forIdName}
        labelText={labelText}
        className="mb-2"
        required={required}
      />
      <Input
        type={inputType}
        id={forIdName}
        name={forIdName}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={inputClassName}
        required={required}
      />
    </>
  );
};

export default InputWLabel;
