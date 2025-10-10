import { db } from '../../db';
import { seed } from 'drizzle-seed';
import {
  usersTable,
  addressesTable,
  usersToAddressesTable
} from '../../schemas';

export const seedUsersToAddresses = async () => {
  const allUsers = await db.select().from(usersTable);
  const allAddresses = await db.select().from(addressesTable);

  await seed(db, { usersToAddressesTable }, { seed: 1 }).refine(funcs => ({
    usersToAddressesTable: {
      columns: {
        userId: funcs.valuesFromArray({
          values: allUsers.map(user => user.id)
        }),
        addressId: funcs.valuesFromArray({
          values: allAddresses.map(address => address.id)
        }),
        createdAt: funcs.timestamp()
      }
    }
  }));

  // eslint-disable-next-line no-console
  console.log('✅ Users to addresses seeded!');
};
