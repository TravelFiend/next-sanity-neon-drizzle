type SelectProps = {
  idName: string;
  options: { label: string; value: string }[];
  required: boolean;
};

const Select: React.FC<SelectProps> = ({
  idName,
  options,
  required = true
}) => {
  return (
    <select
      id={idName}
      name={idName}
      className="rounded border bg-secondary p-[9.5px] text-primary-light placeholder:text-secondary-dark focus:outline-2 focus:outline-tertiary"
      required={required}
    >
      <option selected disabled className="text-secondary-dark">
        Choose one
      </option>
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
