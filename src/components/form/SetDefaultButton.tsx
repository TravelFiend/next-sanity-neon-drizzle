'use client';

import { useTransition } from 'react';
import { updateDefaultAddress } from '@/_actions/address/addressActions';

type SetDefaultButtonProps = {
  addressId: number;
};

const SetDefaultButton = ({ addressId }: SetDefaultButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleAction = () => {
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
      onClick={handleAction}
    >
      {isPending ? 'Updating...' : 'Set as default'}
    </button>
  );
};

export default SetDefaultButton;
