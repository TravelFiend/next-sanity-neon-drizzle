import { usersTable } from '@/_drizzle/schemas';
import { oAuthProvidersEnum, rolesEnum } from '@/_drizzle/schemas/usersDrizzle';
import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import { z } from 'zod';

const oAuthProvidersZodEnum = z.enum(oAuthProvidersEnum.enumValues);
const rolesZodEnum = z.enum(rolesEnum.enumValues);

const userInsertSchema = createInsertSchema(usersTable, {
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

const userSelectSchema = createSelectSchema(usersTable);

type UserSignup = z.infer<typeof signupZodSchema>;
type UserLogin = z.infer<typeof loginZodSchema>;
// TODO: make a new type that only grabs necessary data from user
type UserSelect = z.infer<typeof userSelectSchema>;

export {
  rolesZodEnum,
  oAuthProvidersZodEnum,
  signupZodSchema,
  loginZodSchema,
  userSelectSchema,
  type UserSignup,
  type UserLogin,
  type UserSelect
};
