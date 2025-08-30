import {
  addressTypeEnum,
  rolesEnum,
  userAddressesTable,
  usersTable
} from '@/_drizzle/schemas';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod/v4';

// ZOD USER
const rolesZodEnum = z.enum(rolesEnum.enumValues);

const userInsertSchema = createInsertSchema(usersTable, {
  email: schema =>
    schema.max(255).pipe(z.email({ error: 'Please provide a valid email' })),
  password: schema =>
    schema
      .min(8, { error: 'Password must be at least 8 characters long' })
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

export const signupZodSchema = authBaseSchema;

export const loginZodSchema = authBaseSchema.extend({
  password: z.string().min(1, { error: 'Please enter a password' })
});

export const userSelectSchema = createSelectSchema(usersTable);

export type UserSignup = z.infer<typeof signupZodSchema>;
export type UserLogin = z.infer<typeof loginZodSchema>;
export type UserSelect = z.infer<typeof userSelectSchema>;

// ZOD USER ADDRESS
const addressTypeZodEnum = z.enum(addressTypeEnum.enumValues);

export const userAddressInsertSchema = createInsertSchema(userAddressesTable, {
  addressType: addressTypeZodEnum,
  address1: schema => schema.min(1, 'Address is required'),
  city: schema => schema.min(1, 'City is required'),
  state: schema =>
    schema.length(2, { error: 'State must be exactly 2 characters' }),
  zipCode: schema =>
    schema.regex(/^\d{5}(-\d{4})?$/, {
      error: 'Zip code must be in XXXXX or XXXXX-XXXX format'
    })
});

export const userAddressSelectSchema = createSelectSchema(userAddressesTable);

export type userAddressInsert = z.infer<typeof userAddressInsertSchema>;
export type userAddressSelect = z.infer<typeof userAddressSelectSchema>;
