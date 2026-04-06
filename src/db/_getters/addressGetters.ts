import 'server-only';
import { desc, eq } from 'drizzle-orm';
import { db } from '@/db/db';
import { getSessionUser } from '@/_actions/auth/session.edge';
import { addressesTable } from '@/db/schemas/tables/addressTables';

const getUserAddresses = async () => {
  const user = await getSessionUser();

  if (!user) return;

  const addresses = await db
    .select()
    .from(addressesTable)
    .where(eq(addressesTable.userId, user.id))
    .orderBy(desc(addressesTable.isDefault), desc(addressesTable.createdAt));

  return addresses;
};

export { getUserAddresses };
