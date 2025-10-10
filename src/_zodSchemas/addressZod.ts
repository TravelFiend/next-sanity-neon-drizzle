import { addressesTable } from '@/_drizzle/schemas';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

// 1. DB-shaped schema (matches normalized `addressesTable` table)
const addressInsertSchema = createInsertSchema(addressesTable, {
  address1: schema => schema.min(1, 'Address is required'),
  address2: schema => schema.optional(),
  zipCodeId: schema => schema.int().positive('Must select a valid zip code') // foreign key to zip_codes
});

const addressSelectSchema = createSelectSchema(addressesTable);

type AddressInsert = z.infer<typeof addressInsertSchema>;
type AddressSelect = z.infer<typeof addressSelectSchema>;

// 2. Form schema (for customer-facing forms: city, state, zipCode strings)
const addressFormSchema = z.object({
  streetAddress: z.string().min(1, 'Address is required'),
  secondaryAddress: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().length(2, 'State must be exactly 2 characters'),
  ZIPCode: z.string().regex(/^\d{5}(-\d{4})?$/, {
    error: 'Zip code must be in XXXXX or XXXXX-XXXX format'
  })
});

type AddressForm = z.infer<typeof addressFormSchema>;

export {
  // DB
  addressInsertSchema,
  addressSelectSchema,
  type AddressInsert,
  type AddressSelect,
  // Frontend
  addressFormSchema,
  type AddressForm
};
