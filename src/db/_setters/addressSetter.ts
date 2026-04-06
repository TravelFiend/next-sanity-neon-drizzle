import type { AddressForm } from '@/lib/zod/frontend/addressFormZod';
import { DbTransaction } from '@/types/db';
import { addressesTable } from '../schemas';
import { db } from '../db';

const setAddress = async (
  addressData: AddressForm,
  externalTrx?: DbTransaction
) => {
  const insertAddress = async (trx: DbTransaction) => {
    const {
      userId,
      recipientFirstName,
      recipientLastName,
      recipientEmail,
      addressLabel,
      streetAddress,
      secondaryAddress,
      city,
      state,
      ZIPCode,
      phoneNumber,
      isDefault
    } = addressData;

    await trx.insert(addressesTable).values({
      userId,
      recipientFirstName,
      recipientLastName,
      recipientEmail,
      addressLabel: addressLabel?.toLowerCase() ?? 'home',
      streetAddress,
      secondaryAddress: secondaryAddress || null,
      city,
      state: state.toUpperCase(),
      ZIPCode,
      phoneNumber: phoneNumber || null,
      isDefault: isDefault ?? false
    });
  };

  try {
    return externalTrx
      ? await insertAddress(externalTrx)
      : await db.transaction(async trx => await insertAddress(trx));
  } catch (err) {
    throw new Error(`Error setting address: ${err}`);
  }
};

export default setAddress;
