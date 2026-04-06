'use client';

import { useState } from 'react';
import AddressFormModal from './AddressFormModal';
import conditionalClasses from '@/lib/utils/conditionalClasses';

type AddAddressButtonProps = {
  buttonText: string;
  className?: string;
};

const AddAddressButton = ({ buttonText, className }: AddAddressButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <button
        type="button"
        className={conditionalClasses(
          'cursor-pointer text-accent underline underline-offset-4 transition-colors hover:text-accent/80',
          className
        )}
        onClick={() => setIsModalOpen(true)}
      >
        {buttonText}
      </button>
      {isModalOpen ? (
        <AddressFormModal onClose={() => setIsModalOpen(false)} />
      ) : null}
    </>
  );
};

export default AddAddressButton;
