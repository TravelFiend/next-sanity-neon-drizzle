import { AddressActionState } from '@/_actions/address/addressActions';
import { Recipient } from '@/_zodSchemas/recipientZod';

type InputAddress = {
  streetAddress: string;
  secondaryAddress: string;
  city: string;
  state: string;
  ZIPCode: string;
};

type USPSAddressSuccessResponse = {
  firm: string;
  address: {
    streetAddress: string;
    streetAddressAbbreviation: string;
    secondaryAddress: string;
    cityAbbreviation: string;
    city: string;
    state: string;
    ZIPCode: string;
    ZIPPlus4: string;
    urbanization: string;
  };
  additionalInfo: {
    deliveryPoint: string;
    carrierRoute: string;
    DPVConfirmation: string;
    DPVCMRA: string;
    business: string;
    centralDeliveryPoint: string;
    vacant: string;
  };
  corrections: {
    code: string;
    text: string;
  }[];
  matches: {
    code: string;
    text: string;
  }[];
};

type USPSAddressErrorResponse = {
  apiVersion: string;
  error: {
    code: string;
    message: string;
    errors: Record<string, string>[];
  };
};

type VerifiedAddress = {
  formUser: Recipient;
  formAddress: InputAddress;
  uspsResponse: USPSAddressSuccessResponse;
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
    const dataObj = stateRecord.data as Record<string, object>;
    return (
      typeof dataObj.uspsResponse === 'object' &&
      'uspsResponse' in dataObj &&
      dataObj.uspsResponse !== null
    );
  }

  return false;
};

export {
  type InputAddress,
  type USPSAddressSuccessResponse,
  type USPSAddressErrorResponse,
  type VerifiedAddress,
  isVerifiedAddress
};
