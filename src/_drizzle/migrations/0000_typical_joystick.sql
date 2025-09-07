CREATE TYPE "public"."address_type" AS ENUM('shipping', 'billing');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('customer', 'artist', 'musician');--> statement-breakpoint
CREATE TABLE "user_addresses" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"address_type" "address_type" DEFAULT 'shipping' NOT NULL,
	"address_1" varchar(255) NOT NULL,
	"address_2" varchar(255),
	"city" varchar(50) NOT NULL,
	"state" varchar(2) NOT NULL,
	"zip_code" varchar(15) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"first_name" varchar(255),
	"last_name" varchar(255),
	"birthday" date,
	"role" "role" DEFAULT 'customer' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "user_addresses" ADD CONSTRAINT "user_addresses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;