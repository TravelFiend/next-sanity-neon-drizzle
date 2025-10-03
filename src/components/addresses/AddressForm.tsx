import InputWLabel from '../form/InputWLabel';
import SelectWLabel from '../form/SelectWLabel';
import SubmitButton from '../form/SubmitButton';
import states from '@/lib/constants/states';

const AddressForm: React.FC = () => {
  return (
    <form className="flex flex-col px-10">
      <InputWLabel
        forIdName="email"
        labelText="Email"
        placeholder="youremail@example.com"
        inputClassName="mb-3"
      />

      <div className="mb-3 flex w-full gap-6">
        <div className="w-full">
          <InputWLabel
            forIdName="firstName"
            labelText="First Name"
            placeholder="Johnny"
            inputClassName="w-full"
          />
        </div>
        <div className="w-full">
          <InputWLabel
            forIdName="lastName"
            labelText="Last Name"
            placeholder="Smitherines"
            inputClassName="w-full"
          />
        </div>
      </div>

      <InputWLabel
        forIdName="address1"
        labelText="Street Address"
        placeholder="123 Fairytale Ln."
        inputClassName="mb-3"
      />

      <InputWLabel
        forIdName="address2"
        labelText="Address 2 (Apt/Suite/Unit)"
        placeholder="Apt. 321"
        inputClassName="mb-3"
        required={false}
      />

      <div className="mb-8 flex w-full gap-6">
        <div className="w-full">
          <InputWLabel
            forIdName="city"
            labelText="City"
            placeholder="New Orleans"
            inputClassName="w-full"
          />
        </div>
        <div className="w-full">
          <SelectWLabel forIdName="state" labelText="State" options={states} />
        </div>
        <div className="w-full">
          <InputWLabel
            forIdName="zipCode"
            labelText="Zip Code"
            placeholder="98765"
            inputClassName="w-full"
          />
        </div>
      </div>

      <SubmitButton isPending={true} className="w-5/12" />
    </form>
  );
};

export default AddressForm;
