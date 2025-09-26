import { db } from '../../db';
import { seed } from 'drizzle-seed';
import { users, addresses, usersToAddresses } from '../../schemas';

export const seedUsersToAddresses = async () => {
  const allUsers = await db.select().from(users);
  const allAddresses = await db.select().from(addresses);

  await seed(db, { usersToAddresses }, { seed: 1 }).refine(funcs => ({
    usersToAddresses: {
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
