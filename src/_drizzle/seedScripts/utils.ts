import { sql } from 'drizzle-orm';
import { db } from '../db';

const fixSequences = async () => {
  await db.execute(sql`
    SELECT setval('users_id_seq', (SELECT COALESCE(MAX(id), 0) FROM users));
  `);
};

export { fixSequences };
