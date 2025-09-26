ALTER TABLE "users_to_addresses" DROP COLUMN "address_type";--> statement-breakpoint
ALTER TABLE "users_to_addresses" DROP CONSTRAINT "users_to_addresses_pk";
--> statement-breakpoint
ALTER TABLE "users_to_addresses" ADD CONSTRAINT "users_to_addresses_pk" PRIMARY KEY("user_id","address_id");--> statement-breakpoint
DROP TYPE "public"."address_type";