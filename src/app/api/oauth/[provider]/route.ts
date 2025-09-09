import { db } from '@/_drizzle/db';
import {
  OAuthProvider,
  userOAuthAccountsTable,
  usersTable
} from '@/_drizzle/schemas';
import { oAuthProvidersZodEnum } from '@/_zodSchemas/authZod';
import OAuthClient from '@/auth/oAuthBase';
import { createUserSession } from '@/auth/session.server';
import { eq } from 'drizzle-orm';
import { redirect } from 'next/navigation';
import { NextRequest } from 'next/server';

const GET = async (
  request: NextRequest,
  { params }: { params: Promise<{ provider: string }> }
) => {
  const { provider: rawProvider } = await params;

  const code = request.nextUrl.searchParams.get('code');
  const provider = oAuthProvidersZodEnum.parse(rawProvider);
  console.warn(provider);

  if (typeof code !== 'string') {
    redirect(
      `/login?oauthError=${encodeURIComponent(
        'Failed to connect. Please try again'
      )}`
    );
  }

  try {
    const oAuthUser = await new OAuthClient().fetchUser(code);
    const user = await connectUserToAccount(oAuthUser, provider);
    await createUserSession(user);
    redirect(`/account/${user.id}`);
  } catch (err) {
    console.error(err);

    redirect(
      `/login?oauthError=${encodeURIComponent(
        'Failed to connect. Please try again'
      )}`
    );
  }
};

const connectUserToAccount = (
  { id, email, name }: { id: string; email: string; name: string },
  provider: OAuthProvider
) => {
  return db.transaction(async trx => {
    let user = await trx.query.usersTable.findFirst({
      where: eq(usersTable.email, email),
      columns: { id: true, role: true }
    });

    if (!user) {
      const [newUser] = await trx
        .insert(usersTable)
        .values({
          email,
          userName: name
        })
        .returning({
          id: usersTable.id,
          role: usersTable.role
        });

      user = newUser;
    }

    await trx
      .insert(userOAuthAccountsTable)
      .values({
        provider,
        providerAccountId: id,
        userId: user.id
      })
      .onConflictDoNothing();

    return user;
  });
};

export { GET };
