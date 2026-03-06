import { db } from '../../db';
import { seed } from 'drizzle-seed';
import {
  citiesTable,
  zipCodesTable,
  citiesToZipCodesTable
} from '../../schemas';

export const seedZipCodes = async () => {
  await seed(db, { zipCodesTable }, { seed: 1 }).refine(funcs => ({
    zipCodesTable: {
      count: 40,
      columns: {
        zipCode: funcs.valuesFromArray({
          values: Array.from({ length: 40 }, (_, i) => {
            const float = 0.6180339887 * i;
            const fractionalPart = float - Math.floor(float);
            const offset = Math.floor(89999 * fractionalPart);

            return (10000 + offset).toString().padStart(5, '0');
          })
        })
      }
    }
  }));

  const cities = await db.select().from(citiesTable);
  const zips = await db.select().from(zipCodesTable);

  const rawPairs = zips.map((zip, i) => ({
    cityId: cities[i % cities.length].id,
    zipCodeId: zip.id
  }));

  const uniquePairs = Array.from(
    new Map(
      rawPairs.map(pair => [`${pair.cityId}-${pair.zipCodeId}`, pair])
    ).values()
  );

  await db
    .insert(citiesToZipCodesTable)
    .values(uniquePairs)
    .onConflictDoNothing({
      target: [citiesToZipCodesTable.cityId, citiesToZipCodesTable.zipCodeId]
    });

  // eslint-disable-next-line no-console
  console.log(
    `✅ Zip codes and city-zip relationships seeded (${uniquePairs.length} relations added)`
  );
};
