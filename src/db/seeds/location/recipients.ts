import { seed } from 'drizzle-seed';
import { db } from '@/db/db';
import { recipientsTable } from '@/db/schemas/recipientsDrizzle';

export const seedRecipients = async () => {
  await seed(db, { recipientsTable }, { seed: 1 }).refine(funcs => ({
    recipientsTable: {
      count: 20,
      columns: {
        firstName: funcs.firstName(),
        lastName: funcs.lastName(),
        email: funcs.email(),
        phoneNumber: funcs.phoneNumber({
          template: '+1 (###) ###-####'
        })
      }
    }
  }));

  // eslint-disable-next-line no-console
  console.log('✅ Recipients seeded!!');
};
