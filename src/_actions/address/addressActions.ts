'use server';

import 'server-only';
import { AddressValidationClient } from '@googlemaps/addressvalidation';
import zodValidate from '@/lib/utils/zodValidate';
import {
  type AddressForm,
  addressFormSchema
} from '@/lib/zod/frontend/addressFormZod';
import type { ActionState } from '@/types/actions';
import type {
  GoogleAddressValidatorResponse,
  VerifiedAddress
} from '@/types/address';
import {
  setAddress,
  modifyAddress,
  removeAddress,
  setDefaultAddress
} from '@/db/DAL/_setters/addressSetters';
import { getSessionUser } from '../auth/session.edge';
import { revalidatePath } from 'next/cache';

const validator = new AddressValidationClient({
  apiKey: process.env.GOOGLE_MAPS_API_KEY
});

export type AddressActionState =
  ActionState<AddressForm> | (ActionState<VerifiedAddress> & { fromAPI: true });

const verifyAddress = async (
  prevState: unknown,
  formData: FormData
): Promise<AddressActionState> => {
  const data = Object.fromEntries(formData.entries());

  const raw = {
    ...data,
    id: data.id ? Number(data.id) : undefined,
    isDefault: !!formData.get('isDefault'),
    addressLabel: data.addressLabel ?? null
  };

  const parsed = zodValidate(raw, addressFormSchema);
  const { success, data: addressFormData } = parsed;

  if (!success) return parsed;

  try {
    const recipientData = {
      recipientFirstName: addressFormData.recipientFirstName,
      recipientLastName: addressFormData.recipientLastName,
      recipientEmail: addressFormData.recipientEmail,
      phoneNumber: addressFormData.phoneNumber
    };

    const addressData = {
      id: addressFormData.id,
      streetAddress: addressFormData.streetAddress,
      secondaryAddress: addressFormData.secondaryAddress ?? '',
      city: addressFormData.city,
      state: addressFormData.state,
      ZIPCode: addressFormData.ZIPCode
    };

    const addressRes = await validator.validateAddress({
      address: {
        regionCode: 'US',
        locality: addressData.city,
        administrativeArea: addressData.state,
        postalCode: addressData.ZIPCode,
        addressLines: [addressData.streetAddress, addressData.secondaryAddress]
      },
      enableUspsCass: true
    });

    if (!addressRes) {
      return {
        success: false,
        errors: {
          generic: [
            'There was a problem verifying your address. Please try again.'
          ]
        },
        data: parsed.data
      };
    }

    let addressJSON: GoogleAddressValidatorResponse;
    if (addressRes) {
      addressJSON = addressRes[0].result;
    }

    const verifiedAddress: VerifiedAddress = {
      recipientData: { ...recipientData },
      addressData: {
        ...addressData,
        isDefault: addressFormData.isDefault ?? false
      },
      addressResponse: { ...addressJSON }
    };

    return {
      success: true,
      fromAPI: true,
      data: verifiedAddress
    };
  } catch (err) {
    return {
      success: false,
      errors: {
        generic: [
          `There was a problem verifying your address. Please try again: ${err}`
        ]
      }
    };
  }
};

const addAddress = async (formData: AddressForm) => {
  const user = await getSessionUser();

  if (!user || !user.id) {
    return {
      success: false,
      message: 'You must be logged in to add an address'
    };
  }

  const addressData = {
    ...formData,
    userId: user.id,
    isDefault: !!formData.isDefault,
    addressLabel: formData.addressLabel ?? 'home'
  };

  await setAddress(addressData);
  return { success: true, message: 'Address successfully added to db' };
};

const updateAddress = async (addressId: number, formData: AddressForm) => {
  const user = await getSessionUser();

  if (!user || !user.id) {
    return {
      success: false,
      message: 'You must be logged in to update an address'
    };
  }

  const addressData = {
    ...formData,
    userId: user.id,
    isDefault: !!formData.isDefault,
    addressLabel: formData.addressLabel ?? 'home'
  };

  await modifyAddress(addressId, addressData);
  revalidatePath('/addresses');
  return { success: true, message: 'Address updated successfully' };
};

const updateDefaultAddress = async (addressId: number) => {
  const user = await getSessionUser();

  if (!user || !user.id) {
    return {
      success: false,
      message: 'You must be logged in to set a default address'
    };
  }

  await setDefaultAddress(addressId, user.id);
  revalidatePath('/addresses');
  return { success: true, message: 'Default address set successfully' };
};

const deleteAddress = async (addressId: number) => {
  await removeAddress(addressId);
  revalidatePath('/addresses');
  return { success: true, message: 'Address deleted successfully' };
};

export {
  verifyAddress,
  addAddress,
  updateAddress,
  updateDefaultAddress,
  deleteAddress
};
