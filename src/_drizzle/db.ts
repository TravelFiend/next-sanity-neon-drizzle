import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schemas';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export const db = drizzle({ client: pool, schema });
// async function main() {
//   const user: typeof usersTable.$inferInsert = {
//     name: 'John',
//     age: 30,
//     email: 'john@example.com'
//   };
//   await db.insert(usersTable).values(user);

//   // const users = await db.select().from(usersTable);

//   /*
//   const users: {
//     id: number;
//     name: string;
//     age: number;
//     email: string;
//   }[]
//   */
//   await db
//     .update(usersTable)
//     .set({
//       age: 31
//     })
//     .where(eq(usersTable.email, user.email));

//   // await db.delete(usersTable).where(eq(usersTable.email, user.email));
// }
// main();
