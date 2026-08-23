import { seed } from 'drizzle-seed';
import { db } from '../../db';
import { usersTable } from '../../schemas';

export const seedUsers = async () => {
  await seed(db, { usersTable }, { seed: 1 }).refine(funcs => ({
    usersTable: {
      columns: {
        email: funcs.email(),
        firstName: funcs.firstName(),
        lastName: funcs.lastName(),
        role: funcs.valuesFromArray({
          values: ['customer', 'artist', 'musician']
        })
      }
    }
  }));

  console.log('✅ Users seeded!');
};
