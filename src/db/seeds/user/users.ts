import { seed } from 'drizzle-seed';
import { db } from '../../db';
import { usersTable } from '../../../db/schemas';

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
