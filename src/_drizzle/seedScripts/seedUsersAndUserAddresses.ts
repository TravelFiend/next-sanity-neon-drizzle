import { seed } from 'drizzle-seed';
import { db } from '../db';
import {
  users,
  addresses,
  usersToAddresses,
  userOAuthAccounts
} from '../schemas';
import { sql } from 'drizzle-orm';

const seedIt = async () => {
  await db.execute(
    sql`TRUNCATE TABLE users_to_addresses RESTART IDENTITY CASCADE`
  );
  await db.execute(sql`TRUNCATE TABLE addresses RESTART IDENTITY CASCADE`);
  await db.execute(sql`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);

  await seed(db, { users }, { seed: 1 }).refine(funcs => ({
    users: {
      columns: {
        email: funcs.email(),
        username: funcs.fullName(),
        firstName: funcs.firstName(),
        lastName: funcs.lastName(),
        birthday: funcs.date({ minDate: '1925-01-01', maxDate: '2015-12-31' }),
        role: funcs.valuesFromArray({
          values: ['customer', 'musician', 'artist']
        }),
        createdAt: funcs.timestamp(),
        updatedAt: funcs.timestamp()
      }
    }
  }));

  await seed(db, { addresses }, { seed: 1 }).refine(funcs => ({
    addresses: {
      count: 20,
      columns: {
        // userId: funcs.valuesFromArray({
        //   values: allUsers.map(user => user.id)
        // }),
        // addressType: funcs.valuesFromArray({ values: ['shipping', 'billing'] }),
        address1: funcs.streetAddress(),
        address2: funcs.valuesFromArray({
          values: ['', 'Apt. 2', 'Unit B', 'Suite 100']
        }),
        city: funcs.city(),
        state: funcs.valuesFromArray({
          values: [
            'CA',
            'NY',
            'TX',
            'FL',
            'IL',
            'PA',
            'OH',
            'MI',
            'GA',
            'NC',
            'WA',
            'OR',
            'CO'
          ]
        }),
        zipCode: funcs.postcode(),
        createdAt: funcs.timestamp()
      }
    }
  }));

  const allUsers = await db.select().from(users);
  const allAddresses = await db.select().from(addresses);

  await seed(db, { usersToAddresses }, { seed: 1 }).refine(funcs => ({
    usersToAddresses: {
      count: 20,
      columns: {
        userId: funcs.valuesFromArray({
          values: allUsers.map(user => user.id)
        }),
        addressId: funcs.valuesFromArray({
          values: allAddresses.map(address => address.id)
        }),
        addressType: funcs.valuesFromArray({ values: ['shipping', 'billing'] }),
        createdAt: funcs.timestamp()
      }
    }
  }));

  await seed(db, { userOAuthAccounts }, { seed: 1 }).refine(funcs => ({
    userOAuthAccounts: {
      count: allUsers.length,
      columns: {
        userId: funcs.valuesFromArray({
          values: allUsers.map(user => user.id)
        }),
        provider: funcs.valuesFromArray({
          values: ['google', 'facebook', 'discord', 'github']
        }),
        providerAccountId: funcs.uuid(),
        createdAt: funcs.timestamp(),
        updatedAt: funcs.timestamp()
      }
    }
  }));
};

seedIt();
