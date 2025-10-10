import { db } from '../../db';
import { seed } from 'drizzle-seed';
import { usersTable } from '../../schemas';

export const seedUsers = async () => {
  await seed(db, { usersTable }, { seed: 1 }).refine(funcs => ({
    usersTable: {
      columns: {
        firstName: funcs.firstName(),
        lastName: funcs.lastName(),
        email: funcs.email()
      }
    }
  }));

  // eslint-disable-next-line no-console
  console.log('✅ Users seeded!');
};
