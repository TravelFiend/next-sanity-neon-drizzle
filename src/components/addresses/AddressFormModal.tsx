'use client';

import AddressForm from './AddressForm';
import React, { useActionState } from 'react';
import ModalWrapper from '../common/ModalWrapper';
import addAddress from '@/_actions/address/addressActions';
import { isVerifiedAddress } from '@/types/address';
import VerifiedAddressSelector from './VerifiedAddressSelector';

type AddressFormModalProps = {
  onClose: () => void;
};

const AddressFormModal = ({ onClose }: AddressFormModalProps) => {
  const [addressState, addressAction, isPending] = useActionState(
    addAddress,
    null
  );

  return (
    <ModalWrapper onClose={onClose}>
      {addressState?.success && isVerifiedAddress(addressState) ? (
        <VerifiedAddressSelector addressData={addressState} />
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
