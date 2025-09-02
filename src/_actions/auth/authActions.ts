'use server';

import { eq } from 'drizzle-orm';
import { hash, verify } from 'argon2';
import { db } from '@/_drizzle/db';
import { type InsertUser, usersTable } from '@/_drizzle/schemas';
import {
  type UserLogin,
  type UserSignup,
  loginZodSchema,
  signupZodSchema
} from '@/_zodSchemas/authZod';
import zodValidate from '@/lib/utils/zodValidate';
import { createUserSession, removeSessionUser } from '@/auth/session';
import { redirect } from 'next/navigation';

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
    const [user] = await db.insert(usersTable).values(newUser).returning({
      id: usersTable.id,
      role: usersTable.role,
      email: usersTable.email
    });

    await createUserSession(user);
  } catch (err) {
    if (err instanceof Error) {
      console.error('Insert failed:', err);

      const cause = err.cause as { constraint?: string };
      if (cause.constraint === 'users_email_unique') {
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
    message: 'Account successfully created'
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

  const existingUser = await db.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
    columns: {
      id: true,
      email: true,
      password: true,
      role: true
    }
  });

  if (!existingUser) {
    return {
      success: false,
      errors: {
        login: ['blah blah blah']
      }
    };
  }

  try {
    const isVerified = await verify(existingUser.password, password);

    if (isVerified) {
      await createUserSession(existingUser);

      return {
        success: true,
        message: 'Login successful'
      };
    } else {
      throw new Error('Incorrect email and/or password');
    }
  } catch (err) {
    if (err instanceof Error) {
      return {
        success: false,
        errors: {
          login: [err.message]
        }
      };
    }

    throw err;
  }
};

const logout = async () => {
  await removeSessionUser();
  redirect('/');
};

export { signup, login, logout };
