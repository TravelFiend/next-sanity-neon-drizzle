import { db } from '../../db';
import { seed } from 'drizzle-seed';
import {
  zipCodesTable,
  citiesToZipCodesTable,
  citiesTable
} from '../../schemas';

export const seedZipCodes = async () => {
  const allCities = await db.select().from(citiesTable);

  await seed(db, { zipCodesTable }, { seed: 1 }).refine(funcs => ({
    zipCodesTable: {
      count: 50,
      columns: { zipCode: funcs.postcode() }
    }
  }));

  const allZipCodes = await db.select().from(zipCodesTable);

  const cityZipPairs = allZipCodes.map((zip, i) => ({
    cityId: allCities[i % allCities.length].id,
    zipCodeId: zip.id
  }));

  await seed(db, { citiesToZipCodesTable }, { seed: 1 }).refine(funcs => ({
    citiesToZipCodesTable: {
      count: cityZipPairs.length,
      columns: {
        cityId: funcs.valuesFromArray({
          values: cityZipPairs.map(pair => pair.cityId)
        }),
        zipCodeId: funcs.valuesFromArray({
          values: cityZipPairs.map(pair => pair.zipCodeId)
        })
      }
    }
  }));

  // eslint-disable-next-line no-console
  console.log('✅ Zip codes and city-zip relationships seeded!');
};
