ALTER TABLE "users" RENAME COLUMN "address_1" TO "shipping_address_1";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "address_2" TO "shipping_address_2";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "city" TO "shipping_city";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "state_abbreviation" TO "shipping_state";--> statement-breakpoint
ALTER TABLE "users" RENAME COLUMN "zip_code" TO "shipping_zip_code";--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "billing_address_1" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "billing_address_2" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "billing_city" varchar(50);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "billing_state" varchar(2);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "billing_zip_code" varchar(15);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "updatedAt" timestamp DEFAULT now() NOT NULL;