'use client';

import AddressForm from './AddressForm';
import React, { useActionState } from 'react';
import ModalWrapper from '../common/ModalWrapper';
import addAddress, {
  AddressActionState
} from '@/_actions/address/addressActions';
import { VerifiedAddress } from '@/types/address';
import VerifiedAddressSelector from './VerifiedAddressSelector';

type AddressFormModalProps = {
  onClose: () => void;
};

const AddressFormModal = ({ onClose }: AddressFormModalProps) => {
  const [addressState, addressAction, isPending] = useActionState(
    addAddress,
    null
  );

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
