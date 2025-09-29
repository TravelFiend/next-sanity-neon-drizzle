import FormField from '../common/FormField';
import FormSubmitButton from '../common/FormSubmitButton';

// type ShippingFormProps = {

// }

const ShippingForm: React.FC = () => {
  return (
    <form className="flex w-full flex-col px-10">
      <div className="mb-3 flex w-full justify-between">
        <FormField
          forIdName="firstName"
          labelText="First Name"
          twoPerRow={true}
          placeholder="Johnny"
        />
        <FormField
          forIdName="lastName"
          labelText="Last Name"
          twoPerRow={true}
          placeholder="Smitherines"
        />
      </div>

      <FormField
        forIdName="email"
        labelText="Email"
        placeholder="youremail@example.com"
      />

      <FormSubmitButton isPending={true} />
    </form>
  );
};

export default ShippingForm;
