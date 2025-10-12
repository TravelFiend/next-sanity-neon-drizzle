import Label from './Label';
import TelephoneInput from './TelephoneInput';

type TelephoneInputWLabelProps = {
  forIdName: string;
  labelText: string;
  placeholder?: string;
  defaultValue?: string;
  inputClassName?: string;
  inputPattern?: string;
  required?: boolean;
};

const TelephoneInputWLabel: React.FC<TelephoneInputWLabelProps> = ({
  forIdName,
  labelText,
  placeholder,
  defaultValue,
  inputClassName,
  inputPattern,
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
