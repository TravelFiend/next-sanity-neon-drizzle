'use server';

import { db } from '@/_drizzle/db';
import { usersTable } from '@/_drizzle/schemas';
import { hash, verify } from 'argon2';
import { DrizzleError, eq } from 'drizzle-orm';

const signup = async (prevState: unknown, formData: FormData) => {
  const email = formData.get('email');
  const password = formData.get('password');

  const errors: { password?: string; email?: string } = {};

  let safePassword = '';
  let safeEmail = '';
  // to make TS happy
  if (typeof password !== 'string') {
    errors.password = 'Password is required and must be a string';
  } else if (password.trim().length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  } else {
    safePassword = password;
  }

  if (!email || typeof email !== 'string') {
    errors.email = 'Must provide an email and it must be a string';
  } else {
    safeEmail = email;
  }

  if (Object.keys(errors).length) {
    return {
      success: false,
      errors
    };
  }

  const pwHash = await hash(safePassword);

  const newUser: typeof usersTable.$inferInsert = {
    email: safeEmail,
    password: pwHash
  };

  try {
    await db.insert(usersTable).values(newUser);
  } catch (err) {
    if (err instanceof DrizzleError) {
      const cause = err.cause as { code?: string };
      if (cause.code === '23505') {
        return {
          success: false,
          errors: {
            email: 'An account already exists with this email.'
          }
        };
      }
    }
    throw err;
  }

  return {
    success: true,
    message: 'Account succesfully created!'
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
