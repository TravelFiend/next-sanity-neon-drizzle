'use server';

import { hash, verify } from 'argon2';
import { eq } from 'drizzle-orm';
import { z } from 'zod/v4';
import { db } from '@/_drizzle/db';
import { type InsertUser, usersTable } from '@/_drizzle/schemas';
import { type UserSignup, signupZodSchema } from '@/_zodSchemas/usersZod';

const signup = async (prevState: unknown, formData: FormData) => {
  const raw = {
    email: formData.get('email'),
    password: formData.get('password')
  };

  const parsed = signupZodSchema.safeParse(raw);

  const errs: Record<string, string[]> = {};
  if (!parsed.success) {
    // TODO: handle `errors` destructured from `z.treeifyError(parsed.error)`
    const { properties } = z.treeifyError(parsed.error);

    if (properties) {
      for (const [key, value] of Object.entries(properties)) {
        if (value.errors) {
          errs[key] = value.errors;
        }
      }
    }

    return {
      success: false,
      errors: errs
    };
  }

  const { email, password }: UserSignup = parsed.data;

  const pwHash = await hash(password);

  const newUser: InsertUser = {
    email,
    password: pwHash
  };

  try {
    await db.insert(usersTable).values(newUser);
  } catch (err) {
    if (err instanceof Error) {
      const cause = err.cause as { code?: string };
      if (cause.code === '23505') {
        return {
          success: false,
          errors: {
            email: ['An account already exists with this email.']
          }
        };
      }
    }
    throw err;
  }

  return {
    success: true,
    message: 'Account successfully created!'
  };
};

const login = async (prevState: unknown, formData: FormData) => {
  const email = formData.get('email');
  const password = formData.get('password');

  // to make TS happy
  if (typeof password !== 'string') {
    throw new Error('Password is required and must be a string');
  }

  if (!email || typeof email !== 'string') {
    throw new Error('Must provide an email and it must be a string');
  }
  const storedHash = await db
    .select({ password: usersTable.password })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  const isVerified = await verify(storedHash[0].password, password);

  return isVerified
    ? { message: 'Verified!' }
    : { errors: { login: 'Incorrect email and/or password' } };
};

export { signup, login };
