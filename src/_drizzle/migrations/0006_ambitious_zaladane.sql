CREATE TYPE "public"."address_type" AS ENUM('shipping', 'billing');--> statement-breakpoint
CREATE TABLE "user_addresses" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"addressType" "address_type" DEFAULT 'shipping' NOT NULL,
	"address_1" varchar(255) NOT NULL,
	"address_2" varchar(255),
	"city" varchar(50) NOT NULL,
	"state" varchar(2) NOT NULL,
	"zip_code" varchar(15) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "shipping_address_1";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "shipping_address_2";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "shipping_city";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "shipping_state";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "shipping_zip_code";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "billing_address_1";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "billing_address_2";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "billing_city";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "billing_state";--> statement-breakpoint
ALTER TABLE "users" DROP COLUMN "billing_zip_code";