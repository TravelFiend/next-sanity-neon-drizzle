/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useActionState, useEffect, useState } from 'react';
import addAddress, {
  AddressActionState
} from '@/_actions/address/addressActions';
import InputWLabel from '../form/InputWLabel';
import SelectWLabel from '../form/SelectWLabel';
import SubmitButton from '../form/SubmitButton';
import states from '@/lib/constants/states';
import TelephoneInputWLabel from '../form/TelephoneInputWLabel';
import type { AddressForm as AddressFormType } from '@/_zodSchemas/frontend/addressForm';
import VerifiedAddressSelectorModal from './VerifiedAddressSelectorModal';
import { isVerifiedAddress } from '@/types/address';
import FormErrors from '../form/FormErrors';

type AddressFormProps = {
  externalState?: AddressActionState | null;
  externalAction?: (formData: FormData) => void;
  externalIsPending?: boolean;
  isEmbedded?: boolean;
};

const AddressForm = ({
  externalState,
  externalAction,
  externalIsPending,
  isEmbedded = false
}: AddressFormProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [internalState, internalAction, internalIsPending] = useActionState(
    addAddress,
    null
  );

  const addressState = externalState ?? internalState;
  const addressAction = externalAction ?? internalAction;
  const isPending = externalIsPending ?? internalIsPending;

  useEffect(() => {
    if (
      isEmbedded &&
      addressState &&
      addressState.success &&
      isVerifiedAddress(addressState) &&
      !isModalOpen
    ) {
      setIsModalOpen(true);
    }
  }, [addressState, isEmbedded]);

  const getDefault = (key: keyof AddressFormType) => {
    if (!addressState) return undefined;

    if (addressState.success && isVerifiedAddress(addressState)) {
      const { formUser, formAddress } = addressState.data;
      const originalInput = { ...formUser, ...formAddress };
      return originalInput[key] ?? undefined;
    }

    if (!addressState.success && addressState.data) {
      return (addressState.data as Partial<AddressFormType>)[key] ?? undefined;
    }
  };

  return (
    <>
      <form className="flex flex-col px-10" action={addressAction}>
        <div className="mb-3 flex w-full gap-6">
          <div className="w-full">
            <InputWLabel
              forIdName="firstName"
              labelText="First Name"
              placeholder="Johnny"
              inputClassName="w-full"
              defaultValue={getDefault('firstName')}
            />
          </div>
          <div className="w-full">
            <InputWLabel
              forIdName="lastName"
              labelText="Last Name"
              placeholder="Smitherines"
              inputClassName="w-full"
              defaultValue={getDefault('lastName')}
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
              defaultValue={getDefault('email')}
            />
          </div>
          <div className="w-full">
            <TelephoneInputWLabel
              forIdName="phoneNumber"
              labelText="Phone Number"
              placeholder="+1 (234) 555-4321"
              inputClassName="w-full"
              defaultValue={getDefault('phoneNumber')}
            />
          </div>
        </div>

        <InputWLabel
          forIdName="streetAddress"
          labelText="Street Address"
          placeholder="123 Fairytale Ln."
          inputClassName="mb-3"
          defaultValue={getDefault('streetAddress')}
        />

        <InputWLabel
          forIdName="secondaryAddress"
          labelText="Address 2 (Apt/Suite/Unit)"
          placeholder="Apt. 321"
          inputClassName="mb-3"
          required={false}
          defaultValue={getDefault('secondaryAddress')}
        />

        <div className="mb-8 flex w-full gap-6">
          <div className="w-full">
            <InputWLabel
              forIdName="city"
              labelText="City"
              placeholder="New Orleans"
              inputClassName="w-full"
              defaultValue={getDefault('city')}
            />
          </div>
          <div className="w-full">
            <SelectWLabel
              forIdName="state"
              labelText="State"
              options={states}
            />
          </div>
          <div className="w-full">
            <InputWLabel
              forIdName="ZIPCode"
              labelText="ZIP Code"
              placeholder="98765"
              inputClassName="w-full"
              defaultValue={getDefault('ZIPCode')}
            />
          </div>
        </div>

        {!addressState || !addressState.success ? (
          <FormErrors
            success={false}
            errors={addressState?.errors}
            message={addressState?.message}
            className="h-8"
          />
        ) : null}

        <SubmitButton isPending={isPending} className="w-5/12" />
      </form>

      {isEmbedded && isModalOpen && isVerifiedAddress(addressState) ? (
        <VerifiedAddressSelectorModal
          onClose={() => setIsModalOpen(false)}
          addressData={addressState}
        />
      ) : null}
    </>
  );
};

export default AddressForm;
