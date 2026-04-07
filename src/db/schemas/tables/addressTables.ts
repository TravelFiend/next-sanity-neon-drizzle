import {
  pgTable,
  serial,
  varchar,
  uuid,
  boolean,
  uniqueIndex,
  index
} from 'drizzle-orm/pg-core';
import { usersTable } from './usersTables';
import { timestamps } from '../column.helpers';

const addressesTable = pgTable(
  'addresses',
  {
    id: serial().primaryKey(),
    userId: uuid().references(() => usersTable.id, { onDelete: 'cascade' }),
    recipientFirstName: varchar({ length: 255 }).notNull(),
    recipientLastName: varchar({ length: 255 }).notNull(),
    recipientEmail: varchar({ length: 255 }).notNull(),
    addressLabel: varchar({ length: 50 }),
    streetAddress: varchar({ length: 255 }).notNull(),
    secondaryAddress: varchar({ length: 255 }),
    city: varchar({ length: 100 }).notNull(),
    state: varchar({ length: 2 }).notNull(),
    ZIPCode: varchar('zip_code', { length: 20 }).notNull(),
    phoneNumber: varchar({ length: 20 }),
    isDefault: boolean().default(false).notNull(),
    ...timestamps
  },
  t => [
    uniqueIndex('unique_user_address_idx').on(
      t.userId,
      t.recipientFirstName,
      t.recipientLastName,
      t.streetAddress,
      t.ZIPCode
    ),
    index('address_user_id_idx').on(t.userId),
    index('address_zip_code_idx').on(t.ZIPCode),
    index('address_created_at_idx').on(t.createdAt)
  ]
);

type InsertAddress = typeof addressesTable.$inferInsert;
type Address = typeof addressesTable.$inferSelect;

export {
  // tables
  addressesTable,
  // types
  type InsertAddress,
  type Address
};
