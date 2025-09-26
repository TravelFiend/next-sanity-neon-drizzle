import { db } from '../../db';
import { seed } from 'drizzle-seed';
import { users } from '../../schemas';

export const seedUsers = async () => {
  await seed(db, { users }, { seed: 1 }).refine(funcs => ({
    users: {
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
