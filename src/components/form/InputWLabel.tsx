import Input from './Input';
import Label from './Label';

type InputWLabelProps = {
  forIdName: string;
  labelText: string;
  inputType?: string;
  placeholder?: string;
  defaultValue?: string;
  labelClassName?: string;
  inputClassName?: string;
  inputPattern?: string;
  required?: boolean;
};

const InputWLabel = ({
  forIdName,
  labelText,
  inputType,
  placeholder,
  defaultValue,
  labelClassName,
  inputClassName,
  inputPattern,
  required = true
}: InputWLabelProps) => {
  return (
    <>
      <Label
        htmlFor={forIdName}
        labelText={labelText}
        className={labelClassName}
        required={required}
      />
      <Input
        type={inputType}
        id={forIdName}
        name={forIdName}
        placeholder={placeholder}
        defaultValue={defaultValue}
        className={inputClassName}
        pattern={inputPattern}
        required={required}
      />
    </>
  );
};

export default InputWLabel;
