import { relations, sql } from 'drizzle-orm';
import {
  pgTable,
  serial,
  varchar,
  timestamp,
  uuid,
  primaryKey,
  integer,
  uniqueIndex,
  unique
} from 'drizzle-orm/pg-core';
import { users } from './usersDrizzle';

// STATES
export const states = pgTable('states', {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull().unique(),
  code: varchar({ length: 2 }).notNull().unique()
});

export type InsertStates = typeof states.$inferInsert;
export type SelectStates = typeof states.$inferSelect;

export const statesRelations = relations(states, ({ many }) => ({
  cities: many(cities)
}));

// CITIES
export const cities = pgTable(
  'cities',
  {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    stateId: integer()
      .notNull()
      .references(() => states.id)
  },
  t => [unique('unique_city_per_state').on(t.name, t.stateId)]
);

export type InsertCities = typeof cities.$inferInsert;
export type SelectCities = typeof cities.$inferSelect;

export const citiesRelations = relations(cities, ({ one, many }) => ({
  state: one(states, {
    fields: [cities.stateId],
    references: [states.id]
  }),
  cities: many(citiesToZipCodes)
}));

// ZIP CODES
export const zipCodes = pgTable('zip_codes', {
  id: serial().primaryKey(),
  zipCode: varchar({ length: 15 }).notNull().unique()
});

export type InsertZipCodes = typeof zipCodes.$inferInsert;
export type SelectZipCodes = typeof zipCodes.$inferSelect;

export const zipCodeRelations = relations(zipCodes, ({ many }) => ({
  cities: many(citiesToZipCodes)
}));

// CITIES TO ZIP_CODES
export const citiesToZipCodes = pgTable(
  'cities_to_zip_codes',
  {
    cityId: integer()
      .notNull()
      .references(() => cities.id, { onDelete: 'cascade' }),
    zipCodeId: integer()
      .notNull()
      .references(() => zipCodes.id, { onDelete: 'cascade' })
  },
  t => [
    primaryKey({
      name: 'cities_to_zip_codes_pk',
      columns: [t.cityId, t.zipCodeId]
    })
  ]
);

export const citiesToZipCodesRelations = relations(
  citiesToZipCodes,
  ({ one }) => ({
    city: one(cities, {
      fields: [citiesToZipCodes.cityId],
      references: [cities.id]
    }),
    zipCode: one(zipCodes, {
      fields: [citiesToZipCodes.zipCodeId],
      references: [zipCodes.id]
    })
  })
);

// ADDRESSES
export const addresses = pgTable(
  'addresses',
  {
    id: serial().primaryKey(),
    address1: varchar({ length: 255 }).notNull(),
    address2: varchar({ length: 255 }),
    zipCodeId: integer()
      .notNull()
      .references(() => zipCodes.id, { onDelete: 'restrict' }),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow()
  },
  t => [
    uniqueIndex('unique_full_address').on(
      t.address1,
      sql`COALESCE(${t.address2}, '')`,
      t.zipCodeId
    )
  ]
);

export const addressesRelations = relations(addresses, ({ many }) => ({
  userAddresses: many(usersToAddresses)
}));

export type InsertAddress = typeof addresses.$inferInsert;
export type SelectAddresses = typeof addresses.$inferSelect;

// DRIZZLE USERS_TO_ADDRESSES
export const usersToAddresses = pgTable(
  'users_to_addresses',
  {
    userId: uuid()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    addressId: integer()
      .notNull()
      .references(() => addresses.id, { onDelete: 'cascade' }),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow()
  },
  t => [
    primaryKey({
      name: 'users_to_addresses_pk',
      columns: [t.userId, t.addressId]
    })
  ]
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
