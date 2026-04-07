import 'server-only';
import type { AddressForm } from '@/lib/zod/frontend/addressFormZod';
import { DbTransaction } from '@/types/db';
import { addressesTable } from '../schemas';
import { db } from '../db';
import { and, eq } from 'drizzle-orm';

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

    if (userId) {
      const existingAddress = await trx.query.addressesTable.findFirst({
        where: and(
          eq(addressesTable.userId, userId),
          eq(addressesTable.recipientFirstName, recipientFirstName),
          eq(addressesTable.recipientLastName, recipientLastName),
          eq(addressesTable.streetAddress, streetAddress),
          eq(addressesTable.ZIPCode, ZIPCode)
        )
      });

      if (existingAddress) {
        return existingAddress;
      }

      if (isDefault) {
        await trx
          .update(addressesTable)
          .set({ isDefault: false })
          .where(eq(addressesTable.userId, userId));
      }
    }

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

const setDefaultAddress = async (addressId: number, userId: string) => {
  await db.transaction(async trx => {
    await trx
      .update(addressesTable)
      .set({ isDefault: false })
      .where(eq(addressesTable.userId, userId));

    await trx
      .update(addressesTable)
      .set({
        isDefault: true
      })
      .where(eq(addressesTable.id, addressId));
  });
};

const removeAddress = async (addressId: number) => {
  await db.delete(addressesTable).where(eq(addressesTable.id, addressId));
};

export { setAddress, setDefaultAddress, removeAddress };
