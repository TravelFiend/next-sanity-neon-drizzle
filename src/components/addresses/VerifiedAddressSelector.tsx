'use client';

import { useTransition } from 'react';
import {
  addAddress,
  type AddressActionState
} from '@/_actions/address/addressActions';
import Button from '../common/Button';
import type { AddressForm } from '@/lib/zod/frontend/addressFormZod';
import type { VerifiedAddress } from '@/types/address';
import states from '@/lib/constants/states';

type VerifiedAddressSelectorProps = {
  addressData: Extract<AddressActionState, { fromAPI: true }> & {
    data: VerifiedAddress;
  };
  onClose: () => void;
  onCloseAll?: () => void;
};

type AddressEntry = {
  confirmed: boolean;
  entry: string;
};

const VerifiedAddressSelector = ({
  addressData,
  onClose,
  onCloseAll
}: VerifiedAddressSelectorProps) => {
  const [isPending, startTransition] = useTransition();
  const addressResponse = addressData.data?.addressResponse;
  const addressComponents = addressResponse?.address?.addressComponents;
  const postalAddress = addressResponse?.address?.postalAddress;
  const uspsStandardized = addressResponse?.uspsData?.standardizedAddress;

  if (!addressComponents || addressComponents.length === 0) {
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
        <p className="mt-4">
          No matching address was found. Please go back and fix any errors.
        </p>
      </div>
    );
  }

  let streetNumber: AddressEntry = { confirmed: false, entry: '' };
  let route: AddressEntry = { confirmed: false, entry: '' };
  let secondaryAddress: AddressEntry = { confirmed: false, entry: '' };
  let city: AddressEntry = { confirmed: false, entry: '' };
  let state: AddressEntry = { confirmed: false, entry: '' };
  let zipCode: AddressEntry = { confirmed: false, entry: '' };
  let zipCodeSuffix: AddressEntry = { confirmed: false, entry: '' };

  for (let i = 0; i < addressComponents.length; i++) {
    const confirmed = addressComponents[i].confirmationLevel === 'CONFIRMED';
    const entry = addressComponents[i].componentName?.text ?? '';

    switch (addressComponents[i].componentType) {
      case 'street_number':
        streetNumber = { confirmed, entry };
        break;
      case 'route':
        route = { confirmed, entry };
        break;
      case 'subpremise':
        secondaryAddress = { confirmed, entry };
        break;
      case 'locality':
        city = { confirmed, entry };
        break;
      case 'sublocality':
      case 'sublocality_level_1':
        if (!city.entry) {
          city = { confirmed, entry };
        }
        break;
      case 'administrative_area_level_1':
        state = { confirmed, entry };
        break;
      case 'postal_code':
        zipCode = { confirmed, entry };
        break;
      case 'postal_code_suffix':
        zipCodeSuffix = { confirmed, entry };
        break;
      default:
        break;
    }
  }

  const { recipientData, addressData: inputData } = addressData.data;

  // Assemble full street address
  const streetCombined = [streetNumber.entry, route.entry]
    .filter(Boolean)
    .join(' ');
  const streetText =
    streetCombined ||
    postalAddress?.addressLines?.[0] ||
    uspsStandardized?.firstAddressLine ||
    inputData.streetAddress;
  const isStreetConfirmed =
    (!streetNumber.entry || streetNumber.confirmed) &&
    (!route.entry || route.confirmed) &&
    Boolean(streetNumber.entry || route.entry);

  const secondaryText =
    secondaryAddress.entry ||
    postalAddress?.addressLines?.[1] ||
    uspsStandardized?.secondAddressLine ||
    inputData.secondaryAddress ||
    '';
  const isSecondaryConfirmed = secondaryAddress.entry
    ? secondaryAddress.confirmed
    : true;

  const cityText =
    city.entry ||
    postalAddress?.locality ||
    uspsStandardized?.city ||
    inputData.city;
  const isCityConfirmed = city.entry ? city.confirmed : false;

  const rawState =
    state.entry ||
    postalAddress?.administrativeArea ||
    uspsStandardized?.state ||
    inputData.state;
  const stateText =
    rawState.length === 2
      ? rawState.toUpperCase()
      : (states.find(
          item => item.label.toLowerCase() === rawState.toLowerCase()
        )?.value ?? rawState);
  const isStateConfirmed = state.entry
    ? state.confirmed
    : Boolean(postalAddress?.administrativeArea || uspsStandardized?.state);

  let zipText = zipCode.entry;
  if (zipCode.entry && zipCodeSuffix.entry) {
    zipText = `${zipCode.entry}-${zipCodeSuffix.entry}`;
  } else if (!zipText) {
    zipText =
      postalAddress?.postalCode ||
      (uspsStandardized?.zipCode
        ? uspsStandardized.zipCodeExtension
          ? `${uspsStandardized.zipCode}-${uspsStandardized.zipCodeExtension}`
          : uspsStandardized.zipCode
        : inputData.ZIPCode);
  }
  const isZipConfirmed =
    zipCode.confirmed && (!zipCodeSuffix.entry || zipCodeSuffix.confirmed);

  const handleAddAddress = () => {
    const finalData: AddressForm = {
      ...recipientData,
      streetAddress: streetText,
      secondaryAddress: secondaryText || '',
      city: cityText,
      state: stateText,
      ZIPCode: zipText,
      addressLabel: inputData.addressLabel,
      isDefault: inputData.isDefault
    };

    startTransition(async () => {
      const result = await addAddress(finalData);
      if (!result.success) {
        console.error('There was a problem adding the address to the database');
      }

      if (onCloseAll) {
        onCloseAll();
      } else {
        onClose();
      }
    });
  };

  const {
    streetAddress: inputStreet,
    secondaryAddress: inputUnit,
    city: inputCity,
    state: inputState,
    ZIPCode: inputZIP
  } = inputData;

  const inputAddress = `${inputStreet}${inputUnit ? `, ${inputUnit}` : ''}, ${inputCity}, ${inputState} ${inputZIP}`;

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
        className="bg-gray-100 text-start text-primary-dark"
        disabled={isPending}
      >
        {isPending ? (
          'Adding address...'
        ) : (
          <span>
            <span className={!isStreetConfirmed ? 'text-error' : ''}>
              {streetText}
            </span>
            {secondaryText ? (
              <>
                {', '}
                <span className={!isSecondaryConfirmed ? 'text-error' : ''}>
                  {secondaryText}
                </span>
              </>
            ) : null}
            {', '}
            <span className={!isCityConfirmed ? 'text-error' : ''}>
              {cityText}
            </span>
            {', '}
            <span className={!isStateConfirmed ? 'text-error' : ''}>
              {stateText}
            </span>{' '}
            <span className={!isZipConfirmed ? 'text-error' : ''}>
              {zipText}
            </span>
          </span>
        )}
      </Button>
    </div>
  );
};

export default VerifiedAddressSelector;
