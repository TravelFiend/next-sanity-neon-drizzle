import { Recipient } from '@/_zodSchemas/recipientZod';

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

type VerifiedAddress = USPSAddressSuccessResponse & Recipient;

export type {
  USPSAddressSuccessResponse,
  USPSAddressErrorResponse,
  VerifiedAddress
};
