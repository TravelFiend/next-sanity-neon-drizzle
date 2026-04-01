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
import { usersTable } from './usersDrizzle';
import { recipientsTable } from './recipientsDrizzle';

// STATES
const statesTable = pgTable('states', {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull().unique(),
  code: varchar({ length: 2 }).notNull().unique()
});

type InsertStates = typeof statesTable.$inferInsert;
type SelectStates = typeof statesTable.$inferSelect;

const statesRelations = relations(statesTable, ({ many }) => ({
  cities: many(citiesTable)
}));

// CITIES
const citiesTable = pgTable(
  'cities',
  {
    id: serial().primaryKey(),
    name: varchar({ length: 255 }).notNull(),
    stateId: integer()
      .notNull()
      .references(() => statesTable.id)
  },
  t => [unique('unique_city_per_state').on(t.name, t.stateId)]
);

type InsertCities = typeof citiesTable.$inferInsert;
type SelectCities = typeof citiesTable.$inferSelect;

const citiesRelations = relations(citiesTable, ({ one, many }) => ({
  state: one(statesTable, {
    fields: [citiesTable.stateId],
    references: [statesTable.id]
  }),
  cities: many(citiesToZipCodesTable)
}));

// ZIP CODES
const zipCodesTable = pgTable('zip_codes', {
  id: serial().primaryKey(),
  ZIPCode: varchar({ length: 15 }).notNull().unique()
});

type InsertZipCodes = typeof zipCodesTable.$inferInsert;
type SelectZipCodes = typeof zipCodesTable.$inferSelect;

const zipCodeRelations = relations(zipCodesTable, ({ many }) => ({
  cities: many(citiesToZipCodesTable),
  addresses: many(addressesTable)
}));

// CITIES TO ZIP_CODES
const citiesToZipCodesTable = pgTable(
  'cities_to_zip_codes',
  {
    cityId: integer()
      .notNull()
      .references(() => citiesTable.id, { onDelete: 'cascade' }),
    zipCodeId: integer()
      .notNull()
      .references(() => zipCodesTable.id, { onDelete: 'cascade' })
  },
  t => [
    primaryKey({
      name: 'cities_to_zip_codes_pk',
      columns: [t.cityId, t.zipCodeId]
    })
  ]
);

const citiesToZipCodesRelations = relations(
  citiesToZipCodesTable,
  ({ one }) => ({
    city: one(citiesTable, {
      fields: [citiesToZipCodesTable.cityId],
      references: [citiesTable.id]
    }),
    ZIPCode: one(zipCodesTable, {
      fields: [citiesToZipCodesTable.zipCodeId],
      references: [zipCodesTable.id]
    })
  })
);

// ADDRESSES
const addressesTable = pgTable(
  'addresses',
  {
    id: serial().primaryKey(),
    streetAddress: varchar({ length: 255 }).notNull(),
    secondaryAddress: varchar({ length: 255 }),
    zipCodeId: integer()
      .notNull()
      .references(() => zipCodesTable.id, { onDelete: 'restrict' }),
    recipientId: integer()
      .notNull()
      .references(() => recipientsTable.id, { onDelete: 'restrict' }),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow()
  },
  t => [
    uniqueIndex('unique_full_address').on(
      t.streetAddress,
      sql`COALESCE(${t.secondaryAddress}, '')`,
      t.zipCodeId,
      t.recipientId
    )
  ]
);

const addressesRelations = relations(addressesTable, ({ many, one }) => ({
  userAddresses: many(usersToAddressesTable),
  recipient: one(recipientsTable, {
    fields: [addressesTable.recipientId],
    references: [recipientsTable.id]
  }),
  ZIPCode: one(zipCodesTable, {
    fields: [addressesTable.zipCodeId],
    references: [zipCodesTable.id]
  })
}));

type InsertAddress = typeof addressesTable.$inferInsert;
type SelectAddress = typeof addressesTable.$inferSelect;

// DRIZZLE USERS_TO_ADDRESSES
const usersToAddressesTable = pgTable(
  'users_to_addresses',
  {
    userId: uuid()
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    addressId: integer()
      .notNull()
      .references(() => addressesTable.id, { onDelete: 'cascade' }),
    createdAt: timestamp({ withTimezone: true }).notNull().defaultNow()
  },
  t => [
    primaryKey({
      name: 'users_to_addresses_pk',
      columns: [t.userId, t.addressId]
    })
  ]
);

type InsertUsersToAddress = typeof usersToAddressesTable.$inferInsert;
type SelectUsersToAddress = typeof usersToAddressesTable.$inferSelect;

const usersToAddressesRelations = relations(
  usersToAddressesTable,
  ({ one }) => ({
    address: one(addressesTable, {
      fields: [usersToAddressesTable.addressId],
      references: [addressesTable.id]
    }),
    user: one(usersTable, {
      fields: [usersToAddressesTable.userId],
      references: [usersTable.id]
    })
  })
);

export {
  // tables
  statesTable,
  citiesTable,
  zipCodesTable,
  addressesTable,
  citiesToZipCodesTable,
  usersToAddressesTable,
  // relations
  statesRelations,
  citiesRelations,
  zipCodeRelations,
  addressesRelations,
  citiesToZipCodesRelations,
  usersToAddressesRelations,
  // types
  type InsertStates,
  type SelectStates,
  type InsertCities,
  type SelectCities,
  type InsertZipCodes,
  type SelectZipCodes,
  type InsertAddress,
  type SelectAddress,
  type InsertUsersToAddress,
  type SelectUsersToAddress
};
