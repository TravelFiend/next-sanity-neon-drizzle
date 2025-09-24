// // drizzle/seed.ts
// import { db } from '../db';
// import { seed } from 'drizzle-seed';
// import { sql } from 'drizzle-orm';

// import {
//   states,
//   cities,
//   zipCodes,
//   citiesToZipCodes,
//   addresses,
//   users,
//   usersToAddresses,
//   userOAuthAccounts
// } from '../schemas';

// const seedIt = async () => {
//   // --- 1. Truncate in dependency order ---
//   await db.execute(sql`TRUNCATE TABLE users_to_addresses RESTART IDENTITY CASCADE`);
//   await db.execute(sql`TRUNCATE TABLE addresses RESTART IDENTITY CASCADE`);
//   await db.execute(sql`TRUNCATE TABLE cities_to_zip_codes RESTART IDENTITY CASCADE`);
//   await db.execute(sql`TRUNCATE TABLE zip_codes RESTART IDENTITY CASCADE`);
//   await db.execute(sql`TRUNCATE TABLE cities RESTART IDENTITY CASCADE`);
//   await db.execute(sql`TRUNCATE TABLE states RESTART IDENTITY CASCADE`);
//   await db.execute(sql`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);

//   // --- 2. States ---
//   const stateSeedData = [
//     { code: 'CA', name: 'California' },
//     { code: 'NY', name: 'New York' },
//     { code: 'TX', name: 'Texas' },
//     { code: 'FL', name: 'Florida' },
//     { code: 'IL', name: 'Illinois' },
//     { code: 'PA', name: 'Pennsylvania' },
//     { code: 'OH', name: 'Ohio' },
//     { code: 'MI', name: 'Michigan' },
//     { code: 'GA', name: 'Georgia' },
//     { code: 'NC', name: 'North Carolina' },
//     { code: 'WA', name: 'Washington' },
//     { code: 'OR', name: 'Oregon' },
//     { code: 'CO', name: 'Colorado' }
//   ];

//   await db.insert(states).values(stateSeedData);
//   const allStates = await db.select().from(states);

//   // --- 3. Cities ---
//   await seed(db, { cities }, { seed: 1 }).refine(funcs => ({
//     cities: {
//       count: 50,
//       columns: {
//         name: funcs.city(),
//         stateId: funcs.valuesFromArray({ values: allStates.map(state => state.id) })
//       }
//     }
//   }));

//   const allCities = await db.select().from(cities);

//   // --- 4. Zip Codes ---
//   await seed(db, { zipCodes }, { seed: 1 }).refine(funcs => ({
//     zipCodes: {
//       count: 50,
//       columns: {
//         zipCode: funcs.postcode()
//       }
//     }
//   }));

//   const allZipCodes = await db.select().from(zipCodes);

//   // --- 5. Cities ↔ Zip Codes join ---
//   const cityZipPairs = allZipCodes.map((zip, i) => ({
//     cityId: allCities[i % allCities.length].id,
//     zipCodeId: zip.id
//   }));

//   await seed(db, { citiesToZipCodes }, { seed: 1 }).refine(funcs => ({
//     citiesToZipCodes: {
//       count: cityZipPairs.length,
//       columns: {
//         cityId: funcs.valuesFromArray({ values: cityZipPairs.map(pair => pair.cityId) }),
//         zipCodeId: funcs.valuesFromArray({ values: cityZipPairs.map(pair => pair.zipCodeId) })
//       }
//     }
//   }));

//   // --- 6. Addresses ---
//   await seed(db, { addresses }, { seed: 1 }).refine(funcs => ({
//     addresses: {
//       count: 20,
//       columns: {
//         address1: funcs.streetAddress(),
//         address2: funcs.valuesFromArray({ values: ['', 'Apt. 2', 'Unit B', 'Suite 100'] }),
//         zipCodeId: funcs.valuesFromArray({ values: allZipCodes.map(zip => zip.id) }),
//         createdAt: funcs.timestamp()
//       }
//     }
//   }));

//   const allAddresses = await db.select().from(addresses);

//   // --- 7. Users ---
//   await seed(db, { users }, { seed: 1 }).refine(funcs => ({
//     users: {
//       count: 10,
//       columns: {
//         firstName: funcs.firstName(),
//         lastName: funcs.lastName(),
//         email: funcs.email()
//       }
//     }
//   }));

//   const allUsers = await db.select().from(users);

//   // --- 8. Users ↔ Addresses join (shipping + billing) ---
//   const userAddressPairs: { userId: string; addressId: number; addressType: 'shipping' | 'billing' }[] = [];

//   allUsers.forEach((user, i) => {
//     const shipping = allAddresses[i % allAddresses.length];
//     userAddressPairs.push({ userId: user.id, addressId: shipping.id, addressType: 'shipping' });

//     const billing = allAddresses[(i + 1) % allAddresses.length];
//     userAddressPairs.push({ userId: user.id, addressId: billing.id, addressType: 'billing' });
//   });

//   await seed(db, { usersToAddresses }, { seed: 1 }).refine(funcs => ({
//     usersToAddresses: {
//       count: userAddressPairs.length,
//       columns: {
//         userId: funcs.valuesFromArray({ values: userAddressPairs.map(pair => pair.userId) }),
//         addressId: funcs.valuesFromArray({ values: userAddressPairs.map(pair => pair.addressId) }),
//         addressType: funcs.valuesFromArray({ values: userAddressPairs.map(pair => pair.addressType) }),
//         createdAt: funcs.timestamp()
//       }
//     }
//   }));

//   // --- 9. User OAuth accounts ---
//   const oauthProviders = ['google', 'facebook', 'discord', 'github'] as const;

//   const userOAuthData: Array<{
//     userId: string;
//     provider: typeof oauthProviders[number];
//     providerAccountId: string;
//   }> = [];

//   allUsers.forEach(user => {
//     oauthProviders.forEach(provider => {
//       userOAuthData.push({
//         userId: user.id,
//         provider,
//         providerAccountId: `${provider}-${user.id.slice(0, 8)}` // simple unique ID
//       });
//     });
//   });

//   await seed(db, { userOAuthAccounts }, { seed: 1 }).refine(funcs => ({
//     userOAuthAccounts: {
//       count: userOAuthData.length,
//       columns: {
//         userId: funcs.valuesFromArray({ values: userOAuthData.map(user => user.userId) }),
//         provider: funcs.valuesFromArray({ values: userOAuthData.map(user => user.provider) }),
//         providerAccountId: funcs.uuid(),   // <--- guarantees unique IDs
//         createdAt: funcs.timestamp(),
//         updatedAt: funcs.timestamp()
//       }
//     }
//   }));

//   // eslint-disable-next-line no-console
//   console.log('✅ Seeding complete!');
// };

// seedIt().catch(err => {
//   console.error(err);
//   process.exit(1);
// });
