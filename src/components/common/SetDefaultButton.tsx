'use client';

import { useTransition } from 'react';
import { updateDefaultAddress } from '@/_actions/address/addressActions';

type SetDefaultButtonProps = {
  id: number;
  item: 'address' | 'artist' | 'musician';
};

const SetDefaultButton = ({ id, item }: SetDefaultButtonProps) => {
  const [isPending, startTransition] = useTransition();

  const handleSetDefault = () => {
    startTransition(async () => {
      if (item === 'address') {
        const result = await updateDefaultAddress(id);
        if (!result.success) {
          console.error(result.message);
        }
      } else if (item === 'artist') {
        // TODO: allows musicians to select default artists (maybe not, favorites is better)
        return;
      } else {
        // TODO: allows artists to select default musicians (maybe not, favorites is better)
        return;
      }
    });
  };

  return (
    <button
      type="button"
      disabled={isPending}
      className="mr-4 cursor-pointer text-accent-light underline disabled:opacity-50"
      onClick={handleSetDefault}
    >
      {isPending ? 'Updating...' : 'Set as default'}
    </button>
  );
};

export default SetDefaultButton;
