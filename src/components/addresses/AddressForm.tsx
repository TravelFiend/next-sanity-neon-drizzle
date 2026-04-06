/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useActionState, useEffect, useState } from 'react';
import {
  verifyAddress,
  type AddressActionState
} from '@/_actions/address/addressActions';
import InputWLabel from '../form/InputWLabel';
import SelectWLabel from '../form/SelectWLabel';
import SubmitButton from '../form/SubmitButton';
import states from '@/lib/constants/states';
import TelephoneInputWLabel from '../form/TelephoneInputWLabel';
import type { AddressForm as AddressFormType } from '@/lib/zod/frontend/addressFormZod';
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
    verifyAddress,
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
      const { recipientData, addressData } = addressState.data;
      const originalInput: Partial<AddressFormType> = {
        ...recipientData,
        ...addressData
      };
      const val = originalInput[key];
      return val !== undefined ? String(val) : undefined;
    }

    if (!addressState.success && addressState.data) {
      const val = (addressState.data as Partial<AddressFormType>)[key];
      return val !== undefined ? String(val) : undefined;
    }
  };

  return (
    <>
      <form className="flex flex-col px-10" action={addressAction}>
        <div className="mb-3 flex w-full gap-6">
          <div className="w-full">
            <InputWLabel
              forIdName="recipientFirstName"
              labelText="First Name"
              placeholder="Johnny"
              inputClassName="w-full"
              defaultValue={getDefault('recipientFirstName')}
            />
          </div>
          <div className="w-full">
            <InputWLabel
              forIdName="recipientLastName"
              labelText="Last Name"
              placeholder="Smitherines"
              inputClassName="w-full"
              defaultValue={getDefault('recipientLastName')}
            />
          </div>
        </div>

        <div className="mb-3 flex w-full gap-6">
          <div className="w-full">
            <InputWLabel
              forIdName="recipientEmail"
              labelText="Email"
              placeholder="youremail@example.com"
              inputClassName="w-full"
              inputType="email"
              defaultValue={getDefault('recipientEmail')}
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

        <div className="mb-3 flex w-full gap-6">
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

        <div className="mb-8 flex w-full gap-6">
          <div className="flex w-full flex-col items-start">
            <div className="flex flex-row-reverse">
              <InputWLabel
                inputType="radio"
                forIdName="label-home"
                name="addressLabel"
                inputValue="Home"
                inputClassName="mr-3"
                labelText="Home"
                defaultChecked={getDefault('addressLabel') === 'Home'}
                required={false}
              />
            </div>
            <div className="flex flex-row-reverse">
              <InputWLabel
                inputType="radio"
                forIdName="label-work"
                name="addressLabel"
                inputValue="Work"
                inputClassName="mr-3"
                labelText="Work"
                defaultChecked={getDefault('addressLabel') === 'Work'}
                required={false}
              />
            </div>
          </div>

          <div className="flex w-full flex-row-reverse justify-end">
            <InputWLabel
              inputType="checkbox"
              forIdName="isDefault"
              labelText="Use as default?"
              required={false}
              inputClassName="mr-3"
            />
          </div>
        </div>

        {!addressState || !addressState.success ? (
          <FormErrors
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
