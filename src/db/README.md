## Database Actions

### Migrations

_* Main migration logic can be found in `migrate.ts`_

In our `package.json`, we have several scripts for database migrations.  There are two ways to migrate schema changes:

- `bun run db:push` - Pushes shemas/schema changes directly without generating migration SQL files.  It’s the best approach for rapid prototyping
_* This comes with risk of data-loss.  Not suitable for production_

Because we like things to be safe, we usually go with the second strategy:

-
  1. `bun run db:gen`
        _1. reads previous migration folders
        1. find diff between current and previous schema
        2. prompt developer for renames if necessary
        3. generate SQL migration and persist to file_
  2. `bun run db:migrate`
        _1. read migration.sql files in migrations folder
        1. fetch migration history from database
        2. pick previously unapplied migrations
        3. apply new migration to the database_

To reset everything locally (dev only!)
-  delete the entire `src/db/migrations/` folder + drop the `__drizzle_migrations` tracking table in your DB (then re-generate and migrate).
- For production/Neon → avoid manual drops; use branches + push / migrations carefully, or rely on Neon's restore features.

### Seeding

`bun run db:seed` will seed the database according to the seed files.

__NOTE:__ _this will truncate ALL of the tables in the database, although we have to check to see if we're on the production Neon DB.  If so, seeding will not work, it only runs locally._

_* Main entrypoint is `seedScripts/seedAll.ts`_

### Drizzle Studio

`bun run db:studio` - Generates a url where you can manually make database updates and view tables/data.
