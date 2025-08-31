'use server';

import { hash, verify } from 'argon2';
import { eq } from 'drizzle-orm';
import { db } from '@/_drizzle/db';
import { type InsertUser, usersTable } from '@/_drizzle/schemas';
import {
  type UserLogin,
  type UserSignup,
  loginZodSchema,
  signupZodSchema
} from '@/_zodSchemas/usersZod';
import zodValidate from '@/lib/utils/zodValidate';

type ActionState<T> =
  | {
      success: false;
      errors: Record<string, string[]>;
      message?: string;
    }
  | {
      success: true;
      data?: T;
      message?: string;
    };

const signup = async (
  prevState: unknown,
  formData: FormData
): Promise<ActionState<UserSignup>> => {
  const raw = {
    email: formData.get('email'),
    password: formData.get('password')
  };
  const parsed = zodValidate(raw, signupZodSchema);

  if (!parsed.success) return parsed;

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

const login = async (
  prevState: unknown,
  formData: FormData
): Promise<ActionState<UserLogin>> => {
  const raw = {
    email: formData.get('email'),
    password: formData.get('password')
  };

  const parsed = zodValidate(raw, loginZodSchema);

  if (!parsed.success) return parsed;

  const { email, password }: UserLogin = parsed.data;

  const storedHash = await db
    .select({ password: usersTable.password })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  const isVerified = await verify(storedHash[0].password, password);

  return isVerified
    ? { success: true, message: 'Verified!' }
    : {
        success: false,
        errors: {
          login: ['Incorrect email and/or password']
        }
      };
};

export { signup, login };
