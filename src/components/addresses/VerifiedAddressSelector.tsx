'use client';

import type { AddressActionState } from '@/_actions/address/addressActions';
import type { VerifiedAddress } from '@/types/address';

type VerifiedAddressSelectorProps = {
  addressData: Extract<AddressActionState, { fromAPI: true }> & {
    data: VerifiedAddress;
  };
};

const VerifiedAddressSelector: React.FC<VerifiedAddressSelectorProps> = ({
  addressData
}) => {
  const { streetAddress, secondaryAddress, city, state, ZIPCode, ZIPPlus4 } =
    addressData.data.uspsResponse.address;

  const verifiedAddress = `${streetAddress}, ${secondaryAddress}, ${city}, ${state} ${ZIPCode}${ZIPPlus4 ? `-${ZIPPlus4}` : ''}`;

  return (
    <div className="h-full w-full">
      <button onClick={() => console.warn('MAKE THIS POPULATE THE FORM!')}>
        {verifiedAddress}
      </button>
    </div>
  );
};

export default VerifiedAddressSelector;
