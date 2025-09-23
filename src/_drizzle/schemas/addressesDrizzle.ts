import { relations, sql } from 'drizzle-orm';
import {
  pgTable,
  serial,
  varchar,
  timestamp,
  pgEnum,
  uuid,
  primaryKey,
  integer,
  uniqueIndex
} from 'drizzle-orm/pg-core';
import { users } from './usersDrizzle';

// DRIZZLE ADDRESSES
export const addresses = pgTable(
  'addresses',
  {
    id: serial().primaryKey(),
    address1: varchar({ length: 255 }).notNull(),
    address2: varchar({ length: 255 }),
    city: varchar({ length: 50 }).notNull(),
    state: varchar({ length: 2 }).notNull(),
    zipCode: varchar({ length: 15 }).notNull(),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow()
  },
  t => [
    uniqueIndex('unique_full_address').on(
      t.address1,
      sql`COALESCE(${t.address2}, '')`,
      t.city,
      t.state,
      t.zipCode
    )
  ]
);

export const addressesRelations = relations(addresses, ({ many }) => ({
  userAddresses: many(usersToAddresses)
}));

export type InsertAddress = typeof addresses.$inferInsert;
export type SelectAddresses = typeof addresses.$inferSelect;

// DRIZZLE USERS_TO_ADDRESSES
export const addressTypeEnum = pgEnum('address_type', ['shipping', 'billing']);

export const usersToAddresses = pgTable(
  'users_to_addresses',
  {
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    addressId: integer()
      .notNull()
      .references(() => addresses.id, { onDelete: 'cascade' }),
    addressType: addressTypeEnum().notNull().default('shipping'),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow()
  },
  t => [primaryKey({ columns: [t.userId, t.addressId, t.addressType] })]
);

export type InsertUsersToAddress = typeof usersToAddresses.$inferInsert;
export type SelectUsersToAddresses = typeof usersToAddresses.$inferSelect;

export const usersToAddressesRelations = relations(
  usersToAddresses,
  ({ one }) => ({
    address: one(addresses, {
      fields: [usersToAddresses.addressId],
      references: [addresses.id]
    }),
    user: one(users, {
      fields: [usersToAddresses.userId],
      references: [users.id]
    })
  })
);
