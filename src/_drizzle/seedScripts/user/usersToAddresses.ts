import { db } from '../../db';
import { seed } from 'drizzle-seed';
import { users, addresses, usersToAddresses } from '../../schemas';

export const seedUsersToAddresses = async () => {
  const allUsers = await db.select().from(users);
  const allAddresses = await db.select().from(addresses);

  const userAddressPairs: {
    userId: string;
    addressId: number;
    addressType: 'shipping' | 'billing';
  }[] = [];

  allUsers.forEach((user, i) => {
    const shipping = allAddresses[i % allAddresses.length];
    const billing = allAddresses[(i + 1) % allAddresses.length];
    userAddressPairs.push({
      userId: user.id,
      addressId: shipping.id,
      addressType: 'shipping'
    });
    userAddressPairs.push({
      userId: user.id,
      addressId: billing.id,
      addressType: 'billing'
    });
  });

  await seed(db, { usersToAddresses }, { seed: 1 }).refine(funcs => ({
    usersToAddresses: {
      count: userAddressPairs.length,
      columns: {
        userId: funcs.valuesFromArray({
          values: userAddressPairs.map(user => user.userId)
        }),
        addressId: funcs.valuesFromArray({
          values: userAddressPairs.map(user => user.addressId)
        }),
        addressType: funcs.valuesFromArray({
          values: userAddressPairs.map(user => user.addressType)
        }),
        createdAt: funcs.timestamp()
      }
    }
  }));

  // eslint-disable-next-line no-console
  console.log('✅ Users to addresses seeded!');
};
