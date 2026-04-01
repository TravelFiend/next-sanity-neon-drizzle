import { relations } from 'drizzle-orm';
import { pgTable, serial, uniqueIndex, varchar } from 'drizzle-orm/pg-core';
import { addressesTable } from './addressesDrizzle';

const recipientsTable = pgTable(
  'recipients',
  {
    id: serial().primaryKey(),
    firstName: varchar({ length: 255 }).notNull(),
    lastName: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull(),
    phoneNumber: varchar({ length: 20 }).notNull()
  },
  t => [
    uniqueIndex('unique_recipient_contact').on(t.firstName, t.lastName, t.email)
  ]
);

const recipientsRelations = relations(recipientsTable, ({ many }) => ({
  addresses: many(addressesTable)
}));

export { recipientsTable, recipientsRelations };
