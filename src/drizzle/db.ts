import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/bun-sql';
import { SQL } from 'bun';
// import { eq } from 'drizzle-orm';
// import { usersTable } from '@/db/schemas/users';

config({ path: '.env.local' });

const client = new SQL(process.env.DATABASE_URL!);
export const db = drizzle({ client, casing: 'snake_case' });

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
