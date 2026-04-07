import { seed } from 'drizzle-seed';
import { db } from '../../db';
import { addressesTable, usersTable } from '../../schemas';

export const seedAddresses = async () => {
  const userIds = await db.select({ id: usersTable.id }).from(usersTable);

  await seed(db, { addressesTable }, { seed: 1 }).refine(funcs => ({
    addressesTable: {
      count: 20,
      columns: {
        userId: funcs.valuesFromArray({ values: userIds.map(user => user.id) }),
        recipientFirstName: funcs.firstName(),
        recipientLastName: funcs.lastName(),
        recipientEmail: funcs.email(),
        streetAddress: funcs.streetAddress(),
        secondaryAddress: funcs.valuesFromArray({
          values: ['', 'Apt. 2', 'Unit B', 'Suite 100']
        }),
        city: funcs.city(),
        state: funcs.valuesFromArray({
          values: ['OH', 'VA', 'FL', 'WA', 'AL', 'NY', 'NM', 'PA', 'ID', 'OR']
        }),
        ZIPCode: funcs.valuesFromArray({
          values: Array.from({ length: 40 }, (_, i) => {
            const float = 0.6180339887 * i;
            const fractionalPart = float - Math.floor(float);
            const offset = Math.floor(89999 * fractionalPart);

            return (10000 + offset).toString().padStart(5, '0');
          })
        }),
        addressLabel: funcs.valuesFromArray({
          values: ['work', 'business']
        }),
        isDefault: funcs.boolean(),
        createdAt: funcs.default({ defaultValue: new Date() }),
        updatedAt: funcs.default({ defaultValue: new Date() })
      }
    }
  }));

  console.log('✅ Addresses seeded!');
};
