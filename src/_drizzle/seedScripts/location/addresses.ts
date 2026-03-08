import { seed } from 'drizzle-seed';
import { db } from '../../db';
import { addressesTable, zipCodesTable } from '../../schemas';
import { recipientsTable } from '@/_drizzle/schemas/recipientsDrizzle';

export const seedAddresses = async () => {
  const allZipCodes = await db.select().from(zipCodesTable);
  const allRecipients = await db.select().from(recipientsTable);

  await seed(db, { addressesTable }, { seed: 1 }).refine(funcs => ({
    addressesTable: {
      count: 20,
      columns: {
        streetAddress: funcs.streetAddress(),
        secondaryAddress: funcs.valuesFromArray({
          values: ['', 'Apt. 2', 'Unit B', 'Suite 100']
        }),
        zipCodeId: funcs.valuesFromArray({
          values: allZipCodes.map(zip => zip.id)
        }),
        recipientId: funcs.valuesFromArray({
          values: allRecipients.map(recipient => recipient.id)
        }),
        createdAt: funcs.timestamp()
      }
    }
  }));

  // eslint-disable-next-line no-console
  console.log('✅ Addresses seeded!');
};
