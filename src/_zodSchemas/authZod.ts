import { addresses, users } from '@/_drizzle/schemas';
import { oAuthProvidersEnum, rolesEnum } from '@/_drizzle/schemas/usersDrizzle';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod/v4';

// --------------------
// USER
// --------------------

const rolesZodEnum = z.enum(rolesEnum.enumValues);
const oAuthProvidersZodEnum = z.enum(oAuthProvidersEnum.enumValues);

const userInsertSchema = createInsertSchema(users, {
  email: schema =>
    schema.max(255).pipe(z.email({ error: 'Please provide a valid email' })),
  password: schema =>
    schema
      .min(8, { error: 'Must be at least 8 characters long' })
      .regex(/[a-z]/, { error: 'Must contain at least one lowercase letter' })
      .regex(/[A-Z]/, { error: 'Must contain at least one uppercase letter' })
      .regex(/[0-9]/, { error: 'Must contain at least one number' })
      .regex(/[^a-zA-Z0-9\s]/, {
        error: 'Must contain at least one special character'
      }),
  firstName: schema => schema.min(1, { error: 'First name is required' }),
  lastName: schema => schema.min(1, { error: 'Last name is required' }),
  role: rolesZodEnum
});

const authBaseSchema = userInsertSchema.pick({
  email: true,
  password: true
});

const signupZodSchema = authBaseSchema;

const loginZodSchema = authBaseSchema.extend({
  password: z.string().min(1, { error: 'Please enter a password' })
});

const userSelectSchema = createSelectSchema(users);

type UserSignup = z.infer<typeof signupZodSchema>;
type UserLogin = z.infer<typeof loginZodSchema>;
// TODO: make a new type that only grabs necessary data from user
type UserSelect = z.infer<typeof userSelectSchema>;

// --------------------
// USER ADDRESS
// --------------------

// 1. DB-shaped schema (matches normalized `addresses` table)
const userAddressInsertSchema = createInsertSchema(addresses, {
  address1: schema => schema.min(1, 'Address is required'),
  address2: schema => schema.optional(),
  zipCodeId: schema => schema.int().positive('Must select a valid zip code') // foreign key to zip_codes
});

const userAddressSelectSchema = createSelectSchema(addresses);

type UserAddressInsert = z.infer<typeof userAddressInsertSchema>;
type UserAddressSelect = z.infer<typeof userAddressSelectSchema>;

// 2. Form schema (for customer-facing forms: city, state, zipCode strings)
const userAddressFormSchema = z.object({
  address1: z.string().min(1, 'Address is required'),
  address2: z.string().optional(),
  city: z.string().min(1, 'City is required'),
  state: z.string().length(2, 'State must be exactly 2 characters'),
  zipCode: z.string().regex(/^\d{5}(-\d{4})?$/, {
    error: 'Zip code must be in XXXXX or XXXXX-XXXX format'
  })
});

type UserAddressForm = z.infer<typeof userAddressFormSchema>;

// --------------------
// SESSION
// --------------------

const sessionSchema = z.object({
  id: z.string(),
  role: rolesZodEnum
});

type UserSession = z.infer<typeof sessionSchema>;

export {
  // user
  signupZodSchema,
  loginZodSchema,
  oAuthProvidersZodEnum,
  userSelectSchema,
  type UserSignup,
  type UserLogin,
  type UserSelect,

  // user address
  userAddressInsertSchema, // DB-shaped
  userAddressSelectSchema,
  type UserAddressInsert,
  type UserAddressSelect,
  userAddressFormSchema, // Frontend form
  type UserAddressForm,

  // session
  type UserSession,
  sessionSchema
};
