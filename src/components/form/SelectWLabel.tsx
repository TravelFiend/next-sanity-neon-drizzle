import Select from './Select';
import Label from './Label';

type SelectWLabelProps = {
  forIdName: string;
  labelText: string;
  options: { label: string; value: string }[];
  required?: boolean;
};

const SelectWLabel: React.FC<SelectWLabelProps> = ({
  forIdName,
  labelText,
  options,
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
      <Select idName={forIdName} options={options} required={required} />
    </>
  );
};

export default SelectWLabel;
