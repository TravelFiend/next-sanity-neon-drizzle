'use client';

import {
  addAddress,
  type AddressActionState
} from '@/_actions/address/addressActions';
import type { VerifiedAddress } from '@/types/address';
import Button from '../common/Button';
import { AddressForm } from '@/lib/zod/frontend/addressFormZod';

type VerifiedAddressSelectorProps = {
  addressData: Extract<AddressActionState, { fromAPI: true }> & {
    data: VerifiedAddress;
  };
  onClose: () => void;
};

const VerifiedAddressSelector = ({
  addressData,
  onClose
}: VerifiedAddressSelectorProps) => {
  const handleAddAddress = async () => {
    const { recipientData } = addressData.data;

    const { streetAddress, secondaryAddress, city, state, ZIPCode } =
      addressData.data.uspsResponse.address;

    const finalData: AddressForm = {
      ...recipientData,
      streetAddress,
      secondaryAddress: secondaryAddress ?? '',
      city,
      state,
      ZIPCode,
      addressLabel: addressData.data.addressData.addressLabel,
      isDefault: addressData.data.addressData.isDefault
    };

    await addAddress(finalData);
    onClose();
  };

  const {
    streetAddress: inputStreet,
    secondaryAddress: inputUnit,
    city: inputCity,
    state: inputState,
    ZIPCode: inputZIP
    // ZIPPlus4: inputZIP4
  } = addressData.data.addressData;
  const {
    streetAddress: verifiedStreet,
    secondaryAddress: verifiedUnit,
    city: verifiedCity,
    state: verifiedState,
    ZIPCode: verifiedZIP,
    ZIPPlus4: verifiedZIP4
  } = addressData.data.uspsResponse.address;

  const inputAddress = `${inputStreet}${inputUnit ? `, ${inputUnit}` : ''}, ${inputCity}, ${inputState} ${inputZIP}`;
  const suggestedAddress = `${verifiedStreet}${verifiedUnit ? `, ${verifiedUnit}` : ''}, ${verifiedCity}, ${verifiedState} ${verifiedZIP}${verifiedZIP4 ? `-${verifiedZIP4}` : ''}`;

  return (
    <div className="flex h-full w-full flex-col items-start">
      <div className="flex w-full justify-between">
        <p className="text-2xl underline">Select preferred address:</p>
        <button
          className="cursor-pointer hover:text-secondary-light"
          onClick={onClose}
        >
          X
        </button>
      </div>
      <p className="py-4">
        Submitted Address &#40;
        <span className="text-secondary-light">continue editing</span>
        &#41;:
      </p>
      <Button
        onClick={onClose}
        ariaLabel="select submitted address"
        className="bg-gray-100 text-primary-dark"
      >
        {inputAddress}
      </Button>
      <p className="py-4">
        Suggested Address &#40;
        <span className="text-secondary-light">submit address</span>&#41;:{' '}
      </p>
      <Button
        onClick={handleAddAddress}
        ariaLabel="select suggested address"
        className="bg-gray-100 text-primary-dark"
      >
        {suggestedAddress}
      </Button>
    </div>
  );
};

export default VerifiedAddressSelector;
