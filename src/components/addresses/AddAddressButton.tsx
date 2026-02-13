'use client';

import { useState } from 'react';
import AddressFormModal from './AddressFormModal';

const AddAddressButton = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <button
        type="button"
        className="cursor-pointer text-accent underline underline-offset-4 transition-colors hover:text-accent/80"
        onClick={() => setIsModalOpen(true)}
      >
        Add a new address.
      </button>
      {isModalOpen ? (
        <AddressFormModal onClose={() => setIsModalOpen(false)} />
      ) : null}
    </>
  );
};

export default AddAddressButton;
