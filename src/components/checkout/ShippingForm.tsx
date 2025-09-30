import FormField from '../common/FormField';
import FormSubmitButton from '../common/FormSubmitButton';

// type ShippingFormProps = {

// }

const ShippingForm: React.FC = () => {
  return (
    <form className="flex w-2/3 flex-col px-10">
      <FormField
        forIdName="email"
        labelText="Email"
        placeholder="youremail@example.com"
        inputClassName="mb-3"
      />

      <div className="mb-3 flex w-full gap-6">
        <div className="w-full">
          <FormField
            forIdName="firstName"
            labelText="First Name"
            placeholder="Johnny"
            inputClassName="w-full"
          />
        </div>
        <div className="w-full">
          <FormField
            forIdName="lastName"
            labelText="Last Name"
            placeholder="Smitherines"
            inputClassName="w-full"
          />
        </div>
      </div>

      <FormField
        forIdName="address1"
        labelText="Street Address"
        placeholder="123 Fairytale Ln."
        inputClassName="mb-3"
      />

      <FormField
        forIdName="address2"
        labelText="Address 2 (Apt/Suite/Unit)"
        placeholder="Apt. 321"
        inputClassName="mb-3"
        required={false}
      />

      <FormSubmitButton isPending={true} />
    </form>
  );
};

export default ShippingForm;
