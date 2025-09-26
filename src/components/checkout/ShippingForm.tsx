import FormInput from '../common/FormInput';
import FormLabel from '../common/FormLabel';
import FormSubmitButton from '../common/FormSubmitButton';

// type ShippingFormProps = {

// }

const ShippingForm: React.FC = () => {
  return (
    <form>
      <FormLabel htmlFor="firstName" labelText="First Name" />
      <FormInput id="firstName" name="firstName" placeholder="Johnny" />

      <FormLabel htmlFor="lastName" labelText="Last Name" />
      <FormInput id="lastName" name="lastName" placeholder="Johnny" />

      <FormSubmitButton isPending={true} />
    </form>
  );
};

export default ShippingForm;
