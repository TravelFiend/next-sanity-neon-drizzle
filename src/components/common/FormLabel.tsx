type FormLabelProps = {
  htmlFor: string;
  labelText: string;
  required?: boolean;
};

const FormLabel: React.FC<FormLabelProps> = ({
  htmlFor,
  labelText,
  required = true
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className="font-sans text-primary-light capitalize"
    >
      {required && <span className="pr-2 text-error">*</span>}
      {labelText}:{' '}
    </label>
  );
};

export default FormLabel;
