'use client';

import { createPortal } from 'react-dom';
import AddressForm from './AddressForm';
import React from 'react';

type AddressFormModalProps = {
  onClose: React.Dispatch<React.SetStateAction<boolean>>;
};

const AddressFormModal: React.FC<AddressFormModalProps> = ({ onClose }) => {
  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="signup-modal-title"
    >
      {/* Backdrop */}
      <button
        type="button"
        className="fixed inset-0 cursor-default bg-black/50 backdrop-blur-sm"
        onClick={() => onClose(false)}
        aria-label="Close modal"
      />

      {/* Form */}
      <div className="relative z-10 w-full max-w-xl rounded-xl bg-primary p-6 shadow-lg">
        <AddressForm />
      </div>
    </div>,
    document.body
  );
};

export default AddressFormModal;
