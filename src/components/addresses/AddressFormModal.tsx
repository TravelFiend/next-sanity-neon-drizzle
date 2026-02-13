'use client';

import AddressForm from './AddressForm';
import React from 'react';
import ModalWrapper from '../common/ModalWrapper';

type AddressFormModalProps = {
  onClose: () => void;
};

const AddressFormModal = ({ onClose }: AddressFormModalProps) => {
  return (
    <ModalWrapper onClose={onClose}>
      <AddressForm />
    </ModalWrapper>
  );
};

export default AddressFormModal;
