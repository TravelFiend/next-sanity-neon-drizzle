import 'server-only';
import { eq } from 'drizzle-orm';
import { db } from '../db';
import { usersTable, type User } from '../schemas';
import type { DbTransaction } from '@/types/db';

type GetUserOptions = {
  email: string;
  externalTrx?: DbTransaction;
};

async function getUserByEmail(
  params: GetUserOptions & { columns: Record<string, unknown> }
): Promise<Partial<User> | undefined>;
async function getUserByEmail(params: GetUserOptions): Promise<boolean>;

async function getUserByEmail({
  email,
  externalTrx,
  columns
}: GetUserOptions & { columns?: Record<string, unknown> }) {
  const connection = externalTrx || db;

  const user = await connection.query.usersTable.findFirst({
    where: eq(usersTable.email, email),
    columns: columns as Record<string, unknown> | undefined
  });

  if (columns) {
    return user as Partial<User> | undefined;
  }

  return !!user;
}

export { getUserByEmail };
