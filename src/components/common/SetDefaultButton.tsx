'use client';

import { useTransition } from 'react';
import { updateDefaultAddress } from '@/_actions/address/addressActions';

type SetDefaultButtonProps = {
  addressId: number;
};

const SetDefaultButton = ({ addressId }: SetDefaultButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleSetDefault = () => {
    startTransition(async () => {
      const result = await updateDefaultAddress(addressId);
      if (!result.success) {
        console.error(result.message);
      }
    });
  };

  return (
    <button
      type="button"
      disabled={isPending}
      className="mr-4 text-accent-light underline disabled:opacity-50"
      onClick={handleSetDefault}
    >
      {isPending ? 'Updating...' : 'Set as default'}
    </button>
  );
};

export default SetDefaultButton;
