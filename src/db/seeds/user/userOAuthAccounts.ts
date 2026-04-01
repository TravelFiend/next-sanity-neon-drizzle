import { db } from '../../db';
import {
  type SelectUser,
  userOAuthAccountsTable,
  usersTable
} from '../../../db/schemas';
import { v4 as uuid } from 'uuid';

export const seedUserOAuthAccounts = async () => {
  const allUsers: SelectUser[] = await db.select().from(usersTable);

  const rows = [];

  const providers = ['discord', 'google', 'facebook', 'github'] as const;
  type Provider = (typeof providers)[number];

  for (const user of allUsers) {
    for (const provider of providers) {
      rows.push({
        userId: user.id,
        provider: provider as Provider,
        providerAccountId: `${provider}-${uuid()}`,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
  }

  await db.insert(userOAuthAccountsTable).values(rows);
  // eslint-disable-next-line no-console
  console.log('✅ User OAuth accounts seeded!');
};
