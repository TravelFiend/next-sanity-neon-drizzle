'use client';

import type { VerifiedAddress } from '@/types/address';

type VerifiedAddressSelectorProps = {
  addressData: VerifiedAddress;
};

const VerifiedAddressSelector: React.FC<VerifiedAddressSelectorProps> = ({
  addressData
}) => {
  const { streetAddress, secondaryAddress, city, state, ZIPCode, ZIPPlus4 } =
    addressData.address;

  const verifiedAddress = `${streetAddress}, ${secondaryAddress}, ${city}, ${state} ${ZIPCode}${ZIPPlus4 ? `-${ZIPPlus4}` : ''}`;

  return (
    <div>
      <button onClick={() => console.warn('MAKE THIS POPULATE THE FORM!')}>
        {verifiedAddress}
      </button>
    </div>
  );
};

export default VerifiedAddressSelector;
