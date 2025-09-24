import { db } from '../../db';
import { seed } from 'drizzle-seed';
import { zipCodes, citiesToZipCodes, cities } from '../../schemas';

export const seedZipCodes = async () => {
  const allCities = await db.select().from(cities);

  await seed(db, { zipCodes }, { seed: 1 }).refine(funcs => ({
    zipCodes: {
      count: 50,
      columns: { zipCode: funcs.postcode() }
    }
  }));

  const allZipCodes = await db.select().from(zipCodes);

  const cityZipPairs = allZipCodes.map((zip, i) => ({
    cityId: allCities[i % allCities.length].id,
    zipCodeId: zip.id
  }));

  await seed(db, { citiesToZipCodes }, { seed: 1 }).refine(funcs => ({
    citiesToZipCodes: {
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
