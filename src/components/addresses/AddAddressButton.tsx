'use client';

import { useState } from 'react';
import AddressFormModal from './AddressFormModal';

// type AddAddressButtonProps = {};

const AddAddressButton: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleOpenAddressForm = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <button
        className="cursor-pointer text-accent underline underline-offset-4"
        onClick={handleOpenAddressForm}
      >
        Add a new address.
      </button>
      {isModalOpen ? <AddressFormModal onClose={setIsModalOpen} /> : null}
    </>
  );
};

export default AddAddressButton;
