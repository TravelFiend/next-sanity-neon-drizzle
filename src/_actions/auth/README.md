## User Session - Things to know

We're splitting the session functions here into two separate files.  The reason for this is that if we import a function (like _getUserSession_) into middleware, all pages will error out if those functions live in the same file as functions that:

1 - use `crypto` methods (like _crypto.randomUUID()_)
2 - Import `crypto` from `pg` (the Postgres client Drizzle is using under the hood, which means no drizzle-related imports should be in the **`server.edge.ts`** file)

This is because certain files like `middleware.ts` run on the edge runtime, and importing anything from a file that uses anything that cannot run on the edge runtime (such as crypto) will cause the app to crash.
