import Select from './Select';
import Label from './Label';

type SelectWLabelProps = {
  forIdName: string;
  labelText: string;
  labelClassName?: string;
  options: { label: string; value: string }[];
  required?: boolean;
};

const SelectWLabel = ({
  forIdName,
  labelText,
  labelClassName,
  options,
  required = true
}: SelectWLabelProps) => {
  return (
    <>
      <Label
        htmlFor={forIdName}
        labelText={labelText}
        className={labelClassName}
        required={required}
      />
      <Select idName={forIdName} options={options} required={required} />
    </>
  );
};

export default SelectWLabel;
