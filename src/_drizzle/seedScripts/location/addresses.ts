import { db } from '../../db';
import { seed } from 'drizzle-seed';
import { addresses, zipCodes } from '../../schemas';

export const seedAddresses = async () => {
  const allZipCodes = await db.select().from(zipCodes);

  await seed(db, { addresses }, { seed: 1 }).refine(funcs => ({
    addresses: {
      count: 20,
      columns: {
        address1: funcs.streetAddress(),
        address2: funcs.valuesFromArray({
          values: ['', 'Apt. 2', 'Unit B', 'Suite 100']
        }),
        zipCodeId: funcs.valuesFromArray({
          values: allZipCodes.map(zip => zip.id)
        }),
        createdAt: funcs.timestamp()
      }
    }
  }));

  // eslint-disable-next-line no-console
  console.log('✅ Addresses seeded!');
};
