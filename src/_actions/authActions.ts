'use server';

import { db } from '@/drizzle/db';
import { usersTable } from '@/drizzle/schemas';
import { hash, verify } from 'argon2';
import { eq } from 'drizzle-orm';

const signup = async (prevState: unknown, formData: FormData) => {
  const email = formData.get('email');
  const password = formData.get('password');

  // to make TS happy
  if (typeof password !== 'string') {
    throw new Error('Password is required and must be a string');
  }

  if (!email || typeof email !== 'string') {
    throw new Error('Must provide an email and it must be a string');
  }

  const pwHash = await hash(password);

  const newUser: typeof usersTable.$inferInsert = {
    email,
    password: pwHash
  };

  await db.insert(usersTable).values(newUser);
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

  console.warn({ email, password: isVerified });
};

export { signup, login };
