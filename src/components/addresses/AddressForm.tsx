import { useActionState } from 'react';
import addAddress from '@/_actions/address/addressActions';
import InputWLabel from '../form/InputWLabel';
import SelectWLabel from '../form/SelectWLabel';
import SubmitButton from '../form/SubmitButton';
import states from '@/lib/constants/states';
import TelephoneInputWLabel from '../form/TelephoneInputWLabel';

const AddressForm: React.FC = () => {
  const [addressState, addressAction, isPending] = useActionState(
    addAddress,
    null
  );

  console.warn({ addressState });

  return (
    <form className="flex flex-col px-10" action={addressAction}>
      <div className="mb-3 flex w-full gap-6">
        <div className="w-full">
          <InputWLabel
            forIdName="firstName"
            labelText="First Name"
            placeholder="Johnny"
            inputClassName="w-full"
            defaultValue={addressState?.data?.firstName ?? undefined}
          />
        </div>
        <div className="w-full">
          <InputWLabel
            forIdName="lastName"
            labelText="Last Name"
            placeholder="Smitherines"
            inputClassName="w-full"
            defaultValue={addressState?.data?.lastName ?? undefined}
          />
        </div>
      </div>

      <div className="mb-3 flex w-full gap-6">
        <div className="w-full">
          <InputWLabel
            forIdName="email"
            labelText="Email"
            placeholder="youremail@example.com"
            inputClassName="w-full"
            inputType="email"
            defaultValue={addressState?.data?.email}
          />
        </div>
        <div className="w-full">
          <TelephoneInputWLabel
            forIdName="phoneNumber"
            labelText="Phone Number"
            placeholder="+1 (234) 555-4321"
            inputClassName="w-full"
          />
        </div>
      </div>

      <InputWLabel
        forIdName="address1"
        labelText="Street Address"
        placeholder="123 Fairytale Ln."
        inputClassName="mb-3"
        defaultValue={addressState?.data?.address1}
      />

      <InputWLabel
        forIdName="address2"
        labelText="Address 2 (Apt/Suite/Unit)"
        placeholder="Apt. 321"
        inputClassName="mb-3"
        required={false}
        defaultValue={addressState?.data?.address2 || undefined}
      />

      <div className="mb-8 flex w-full gap-6">
        <div className="w-full">
          <InputWLabel
            forIdName="city"
            labelText="City"
            placeholder="New Orleans"
            inputClassName="w-full"
            defaultValue={addressState?.data?.city}
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
            defaultValue={addressState?.data?.zipCode}
          />
        </div>
      </div>

      <SubmitButton isPending={isPending} className="w-5/12" />
    </form>
  );
};

export default AddressForm;
