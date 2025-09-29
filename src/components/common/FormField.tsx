import FormInput from './FormInput';
import FormLabel from './FormLabel';
import conditionalClasses from '@/lib/utils/conditionalClasses';

type FormFieldProps = {
  forIdName: string;
  labelText: string;
  inputType?: string;
  twoPerRow?: boolean;
  placeholder?: string;
};

const FormField: React.FC<FormFieldProps> = ({
  forIdName,
  labelText,
  inputType,
  twoPerRow = false,
  placeholder
}) => {
  return (
    <div className={conditionalClasses('mb-3 flex', twoPerRow ? 'w-1/2' : '')}>
      <FormLabel htmlFor={forIdName} labelText={labelText} className="mr-3" />
      <FormInput
        type={inputType}
        id={forIdName}
        name={forIdName}
        placeholder={placeholder}
        className=""
      />
    </div>
  );
};

export default FormField;
