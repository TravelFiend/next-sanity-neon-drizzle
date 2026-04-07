import { relations } from 'drizzle-orm';
import { userOAuthAccountsTable, usersTable } from '../tables/usersTables';
import { addressesTable } from '../tables/addressTables';

const userRelations = relations(usersTable, ({ many }) => ({
  oAuthAccounts: many(userOAuthAccountsTable),
  addresses: many(addressesTable)
}));

const userOAuthAccountRelations = relations(
  userOAuthAccountsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [userOAuthAccountsTable.userId],
      references: [usersTable.id]
    })
  })
);

export { userRelations, userOAuthAccountRelations };
