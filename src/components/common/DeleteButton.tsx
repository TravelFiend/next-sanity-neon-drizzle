'use client';

import { useTransition } from 'react';
import { deleteAddress } from '@/_actions/address/addressActions';

type DeleteButtonProps = {
  addressId: number;
};

const DeleteButton = ({ addressId }: DeleteButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteAddress(addressId);
      if (!result.success) {
        console.error(result.message);
      }
    });
  };

  return (
    <button
      type="button"
      disabled={isPending}
      className="mr-4 text-error underline disabled:opacity-50"
      onClick={handleDelete}
    >
      {isPending ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeleteButton;
