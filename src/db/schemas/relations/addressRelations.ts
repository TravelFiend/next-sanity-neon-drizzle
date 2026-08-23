import { relations } from 'drizzle-orm';
import { addressesTable } from '../tables/addressTables';
import { usersTable } from '../tables/usersTables';

const addressesRelations = relations(addressesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [addressesTable.userId],
    references: [usersTable.id]
  })
}));

export { addressesRelations };
