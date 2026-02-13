'use server';

import 'server-only';
import getValidUspsToken from '@/lib/utils/getUspsToken';
import zodValidate from '@/lib/utils/zodValidate';
import {
  type AddressForm,
  addressFormSchema
} from '@/_zodSchemas/frontend/addressForm';
import type { ActionState } from '@/types/actions';
import type {
  USPSAddressErrorResponse,
  USPSAddressSuccessResponse,
  VerifiedAddress
} from '@/types/address';

export type AddressActionState =
  | ActionState<AddressForm>
  | (ActionState<VerifiedAddress> & { fromAPI: true });

let USPS_ADDRESS_URL;
if (process.env.NODE_ENV === 'development') {
  USPS_ADDRESS_URL = 'https://apis-tem.usps.com/addresses/v3/address';
} else {
  USPS_ADDRESS_URL = 'https://apis.usps.com/addresses/v3/address';
}

const addAddress = async (
  prevState: unknown,
  formData: FormData
): Promise<AddressActionState> => {
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

    const params = new URLSearchParams({
      streetAddress: addressFormData.address1,
      secondaryAddress: addressFormData.address2 ?? '',
      city: addressFormData.city,
      state: addressFormData.state,
      ZIPCode: addressFormData.zipCode
    });

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
      ...addressFormData,
      ...addressJSON
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

export default addAddress;

// const it = {
//   city: 'Rock River',
//   state: 'OH',
//   zipCode: '44111',
//   address1: '19319 Riverwood Ave',
//   address2: '',
//   firstName: 'Mike',
//   lastName: 'Grace',
//   email: 'you@me.com',
//   phoneNumber: '+1 (440) 829-5501',
//   firm: '',
//   address: {
//     streetAddress: '19319 RIVERWOOD AVE',
//     streetAddressAbbreviation: '19319 RIVERWOOD AVE',
//     secondaryAddress: '',
//     cityAbbreviation: 'ROCKY RIVER',
//     city: 'ROCKY RIVER',
//     state: 'OH',
//     ZIPCode: '44116',
//     ZIPPlus4: '2734',
//     urbanization: ''
//   },
//   additionalInfo: {
//     deliveryPoint: '19',
//     carrierRoute: 'C008',
//     DPVConfirmation: 'Y',
//     DPVCMRA: 'N',
//     business: 'N',
//     centralDeliveryPoint:'',
//     vacant:'N'
//   },
//   'corrections': [
//     {'code':'','text':''}
//   ],
//   matches:[
//     {
//       code: '31',
//       text: 'Single Response - exact match'
//     }
//   ]
// }
