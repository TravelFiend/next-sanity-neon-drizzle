'use client';

import AddressForm from './AddressForm';
import { useActionState, useEffect, useState } from 'react';
import ModalWrapper from '../common/ModalWrapper';
import addAddress from '@/_actions/address/addressActions';
import { isVerifiedAddress } from '@/types/address';
import VerifiedAddressSelector from './VerifiedAddressSelector';

type AddressFormModalProps = {
  onClose: () => void;
};

const AddressFormModal = ({ onClose }: AddressFormModalProps) => {
  const [showSelector, setShowSelector] = useState<boolean>(false);
  const [addressState, addressAction, isPending] = useActionState(
    addAddress,
    null
  );

  useEffect(() => {
    if (addressState?.success && isVerifiedAddress(addressState)) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShowSelector(true);
    }
  }, [addressState]);

  return (
    <ModalWrapper onClose={showSelector ? undefined : onClose}>
      {addressState?.success &&
      isVerifiedAddress(addressState) &&
      showSelector ? (
        <VerifiedAddressSelector
          addressData={addressState}
          onClose={() => setShowSelector(false)}
        />
      ) : (
        <AddressForm
          externalState={addressState}
          externalAction={addressAction}
          externalIsPending={isPending}
        />
      )}
    </ModalWrapper>
  );
};

export default AddressFormModal;
