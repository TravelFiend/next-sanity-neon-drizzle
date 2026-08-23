import Input from './Input';
import Label from './Label';

type InputWLabelProps = {
  forIdName: string;
  name?: string;
  placeholder?: string;
  defaultValue?: string;
  defaultChecked?: boolean;
  labelText: string;
  labelClassName?: string;
  inputClassName?: string;
  inputPattern?: string;
  inputValue?: string;
  inputType?: string;
  required?: boolean;
};

const InputWLabel = ({
  forIdName,
  name,
  placeholder,
  defaultValue,
  defaultChecked,
  labelText,
  labelClassName,
  inputClassName,
  inputPattern,
  inputValue,
  inputType = 'text',
  required = true
}: InputWLabelProps) => {
  return (
    <>
      <Label
        htmlFor={forIdName}
        labelText={labelText}
        className={labelClassName}
        required={required}
        inputType={inputType}
      />
      <Input
        type={inputType}
        id={forIdName}
        name={name ?? forIdName}
        value={inputValue}
        placeholder={placeholder}
        defaultValue={defaultValue}
        defaultChecked={defaultChecked}
        className={inputClassName}
        pattern={inputPattern}
        required={required}
      />
    </>
  );
};

export default InputWLabel;
