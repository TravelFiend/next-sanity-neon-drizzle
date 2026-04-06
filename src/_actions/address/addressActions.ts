'use server';

import 'server-only';
import getValidUspsToken from '@/lib/utils/getUspsToken';
import zodValidate from '@/lib/utils/zodValidate';
import {
  type AddressForm,
  addressFormSchema
} from '@/lib/zod/frontend/addressFormZod';
import type { ActionState } from '@/types/actions';
import type {
  USPSAddressErrorResponse,
  USPSAddressSuccessResponse,
  VerifiedAddress
} from '@/types/address';
import { removeAddress, setDefaultAddress } from '@/db/_setters/addressSetters';
import { setAddress } from '@/db/_setters/addressSetters';
import { getSessionUser } from '../auth/session.edge';
import { revalidatePath } from 'next/cache';

export type AddressActionState =
  | ActionState<AddressForm>
  | (ActionState<VerifiedAddress> & { fromAPI: true });

let USPS_ADDRESS_URL;
if (process.env.NODE_ENV === 'development') {
  USPS_ADDRESS_URL = 'https://apis-tem.usps.com/addresses/v3/address';
} else {
  USPS_ADDRESS_URL = 'https://apis.usps.com/addresses/v3/address';
}

const verifyAddress = async (
  prevState: unknown,
  formData: FormData
): Promise<AddressActionState> => {
  const data = Object.fromEntries(formData.entries());

  const raw = {
    ...data,
    isDefault: !!formData.get('isDefault'),
    addressLabel: data.addressLabel ?? null
  };

  const parsed = zodValidate(raw, addressFormSchema);
  const { success, data: addressFormData } = parsed;

  if (!success) return parsed;

  try {
    const accessToken = await getValidUspsToken();
    if (!accessToken) {
      return {
        success: false,
        errors: {
          accessToken: ['Access token was not retrieved.  Please try again.']
        }
      };
    }

    const recipientData = {
      recipientFirstName: addressFormData.recipientFirstName,
      recipientLastName: addressFormData.recipientLastName,
      recipientEmail: addressFormData.recipientEmail,
      phoneNumber: addressFormData.phoneNumber
    };

    const addressData = {
      streetAddress: addressFormData.streetAddress,
      secondaryAddress: addressFormData.secondaryAddress ?? '',
      city: addressFormData.city,
      state: addressFormData.state,
      ZIPCode: addressFormData.ZIPCode
    };

    const params = new URLSearchParams({ ...addressData });

    const addressRes = await fetch(`${USPS_ADDRESS_URL}?${params.toString()}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const addressJSON: USPSAddressSuccessResponse | USPSAddressErrorResponse =
      await addressRes.json();

    if (!addressJSON) {
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

    if ('error' in addressJSON) {
      return {
        success: false,
        errors: {
          generic: [addressJSON.error.message]
        },
        data: parsed.data
      };
    }

    const verifiedAddress: VerifiedAddress = {
      recipientData: { ...recipientData },
      addressData: {
        ...addressData,
        isDefault: addressFormData.isDefault ?? false
      },
      uspsResponse: { ...addressJSON }
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

export { verifyAddress, addAddress, updateDefaultAddress, deleteAddress };
