import { protos } from '@googlemaps/addressvalidation';
import type { AddressActionState } from '@/_actions/address/addressActions';
import type { AddressInsert } from '@/lib/zod/addressZod';

type AddressRecipient = Pick<
  AddressInsert,
  'recipientFirstName' | 'recipientLastName' | 'recipientEmail' | 'phoneNumber'
>;

type AddressLocation = Pick<
  AddressInsert,
  | 'id'
  | 'streetAddress'
  | 'secondaryAddress'
  | 'city'
  | 'state'
  | 'ZIPCode'
  | 'addressLabel'
  | 'isDefault'
>;

type GoogleAddressValidatorResponse =
  protos.google.maps.addressvalidation.v1.IValidationResult | undefined | null;

type VerifiedAddress = {
  // userId: string;
  recipientData: AddressRecipient;
  addressData: AddressLocation;
  addressResponse: GoogleAddressValidatorResponse;
};

// typeguard
const isVerifiedAddress = (
  state: unknown
): state is Extract<AddressActionState, { fromAPI: true }> & {
  data: VerifiedAddress;
} => {
  if (typeof state !== 'object' || !state) return false;

  const stateRecord = state as Record<string, unknown>;
  const hasData = typeof stateRecord.data === 'object' && !!stateRecord.data;

  if (!!stateRecord.success && !!stateRecord.fromAPI && hasData) {
    const dataObj = stateRecord.data as Record<string, unknown>;
    return (
      typeof dataObj.addressResponse === 'object' &&
      'addressResponse' in dataObj &&
      dataObj.addressResponse !== null
    );
  }

  return false;
};

export {
  type AddressRecipient,
  type AddressLocation,
  type GoogleAddressValidatorResponse,
  type VerifiedAddress,
  isVerifiedAddress
};
