'use server';

import 'server-only';
import getValidUspsToken from '@/lib/utils/getUspsToken';
import zodValidate from '@/lib/utils/zodValidate';
import {
  AddressForm,
  addressFormSchema
} from '@/_zodSchemas/frontend/addressForm';
import type { ActionState } from '../auth/authActions';

const addAddress = async (
  prevState: unknown,
  formData: FormData
): Promise<ActionState<AddressForm>> => {
  const accessToken = await getValidUspsToken();

  if (!accessToken) {
    return {
      success: false,
      errors: {
        accessToken: ['Access token was not retrieved.  Please try again.']
      }
    };
  }

  const raw = {
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    phoneNumber: formData.get('phoneNumber'),
    address1: formData.get('address1'),
    address2: formData.get('address2'),
    city: formData.get('city'),
    state: formData.get('state'),
    zipCode: formData.get('zipCode')
  };

  const parsed = zodValidate(raw, addressFormSchema);

  if (!parsed.success) return parsed;

  return parsed.data;
};

export default addAddress;
