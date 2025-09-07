import { seed } from 'drizzle-seed';
import { db } from '../db';
import { usersTable, userAddressesTable } from '../schemas';
import { sql } from 'drizzle-orm';
import { fixSequences } from './utils';

const seedIt = async () => {
  await db.execute(sql`TRUNCATE TABLE users RESTART IDENTITY CASCADE`);

  await seed(db, { usersTable }, { seed: 1 }).refine(funcs => ({
    usersTable: {
      columns: {
        email: funcs.email(),
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

  const users = await db.select().from(usersTable);

  await seed(db, { userAddressesTable }, { seed: 1 }).refine(funcs => ({
    userAddressesTable: {
      count: 20,
      columns: {
        userId: funcs.valuesFromArray({
          values: users.map(user => user.id)
        }),
        addressType: funcs.valuesFromArray({ values: ['shipping', 'billing'] }),
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

  fixSequences();
};

seedIt();
