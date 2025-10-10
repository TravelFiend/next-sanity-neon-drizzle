import { db } from '../../db';
import { seed } from 'drizzle-seed';
import {
  citiesTable,
  zipCodesTable,
  citiesToZipCodesTable
} from '../../schemas';

export const seedCitiesToZipCodes = async () => {
  const allCities = await db.select({ id: citiesTable.id }).from(citiesTable);
  const allZipCodes = await db
    .select({ id: zipCodesTable.id })
    .from(zipCodesTable);

  await seed(db, { citiesToZipCodesTable }, { seed: 1 }).refine(funcs => ({
    citiesToZipCodesTable: {
      columns: {
        cityId: funcs.valuesFromArray({
          values: allCities.map(city => city.id)
        }),
        zipCodeId: funcs.valuesFromArray({
          values: allZipCodes.map(zip => zip.id)
        })
      }
    }
  }));

  // eslint-disable-next-line no-console
  console.log('✅ Cities to zip codes seeded!');
};
