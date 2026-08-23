import Label from './Label';
import TelephoneInput from './TelephoneInput';

type TelephoneInputWLabelProps = {
  forIdName: string;
  labelText: string;
  labelClassName?: string;
  placeholder?: string;
  defaultValue?: string;
  inputClassName?: string;
  inputPattern?: string;
  required?: boolean;
};

const TelephoneInputWLabel = ({
  forIdName,
  labelText,
  labelClassName,
  placeholder,
  defaultValue,
  inputClassName,
  inputPattern,
  required = true
}: TelephoneInputWLabelProps) => {
  return (
    <>
      <Label
        htmlFor={forIdName}
        labelText={labelText}
        className={labelClassName}
        required={required}
      />
      <TelephoneInput
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

export default TelephoneInputWLabel;
