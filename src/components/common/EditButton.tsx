'use client';

import { useState, type ReactNode } from 'react';
import Button from '@/components/common/Button';
import AddressFormModal from '@/components/addresses/AddressFormModal';
import { AddressInsert } from '@/lib/zod/addressZod';

type EditButtonProps = {
  item: 'address' | 'artist' | 'musician';
  initialData: AddressInsert;
  ariaLabel?: string;
  className?: string;
  children?: ReactNode;
};

const EditButton = ({
  item,
  initialData,
  ariaLabel,
  className = 'mr-4 text-accent-light underline',
  children = 'Edit'
}: EditButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleClose = () => setIsModalOpen(false);

  const renderModal = () => {
    if (!isModalOpen) return null;

    if (item === 'address') {
      return (
        <AddressFormModal initialData={initialData} onClose={handleClose} />
      );
    }

    if (item === 'artist') {
      // TODO: Add ArtistFormModal when available
      return null;
    }

    if (item === 'musician') {
      // TODO: Add MusicianFormModal when available
      return null;
    }

    return null;
  };

  const computedAriaLabel =
    ariaLabel || (typeof children === 'string' ? children : 'Edit');

  return (
    <>
      <Button
        type="button"
        className={className}
        onClick={() => setIsModalOpen(true)}
        ariaLabel={computedAriaLabel}
      >
        {children}
      </Button>
      {renderModal()}
    </>
  );
};

export default EditButton;
