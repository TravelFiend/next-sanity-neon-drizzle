CREATE TYPE "public"."oauth_providers" AS ENUM('google', 'facebook', 'discord', 'github');--> statement-breakpoint
CREATE TYPE "public"."role" AS ENUM('customer', 'artist', 'musician');--> statement-breakpoint
CREATE TYPE "public"."address_type" AS ENUM('shipping', 'billing');--> statement-breakpoint
CREATE TABLE "user_oauth_accounts" (
	"user_id" uuid NOT NULL,
	"provider" "oauth_providers" NOT NULL,
	"provider_account_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_oauth_accounts_provider_account_id_provider_pk" PRIMARY KEY("provider_account_id","provider")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar(255) NOT NULL,
	"password" varchar(255),
	"username" varchar(255),
	"first_name" varchar(255),
	"last_name" varchar(255),
	"birthday" date,
	"role" "role" DEFAULT 'customer' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "addresses" (
	"id" serial PRIMARY KEY NOT NULL,
	"address1" varchar(255) NOT NULL,
	"address2" varchar(255),
	"zip_code_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "cities" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"state_id" integer NOT NULL,
	CONSTRAINT "unique_city_per_state" UNIQUE("name","state_id")
);
--> statement-breakpoint
CREATE TABLE "cities_to_zip_codes" (
	"city_id" integer NOT NULL,
	"zip_code_id" integer NOT NULL,
	CONSTRAINT "cities_to_zip_codes_city_id_zip_code_id_pk" PRIMARY KEY("city_id","zip_code_id")
);
--> statement-breakpoint
CREATE TABLE "states" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"code" varchar(2) NOT NULL,
	CONSTRAINT "states_name_unique" UNIQUE("name"),
	CONSTRAINT "states_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "users_to_addresses" (
	"user_id" uuid NOT NULL,
	"address_id" integer NOT NULL,
	"address_type" "address_type" DEFAULT 'shipping' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_to_addresses_user_id_address_id_address_type_pk" PRIMARY KEY("user_id","address_id","address_type")
);
--> statement-breakpoint
CREATE TABLE "zip_codes" (
	"id" serial PRIMARY KEY NOT NULL,
	"zip_code" varchar(15) NOT NULL,
	CONSTRAINT "zip_codes_zipCode_unique" UNIQUE("zip_code")
);
--> statement-breakpoint
ALTER TABLE "user_oauth_accounts" ADD CONSTRAINT "user_oauth_accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "addresses" ADD CONSTRAINT "addresses_zip_code_id_zip_codes_id_fk" FOREIGN KEY ("zip_code_id") REFERENCES "public"."zip_codes"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cities" ADD CONSTRAINT "cities_state_id_states_id_fk" FOREIGN KEY ("state_id") REFERENCES "public"."states"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cities_to_zip_codes" ADD CONSTRAINT "cities_to_zip_codes_city_id_cities_id_fk" FOREIGN KEY ("city_id") REFERENCES "public"."cities"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "cities_to_zip_codes" ADD CONSTRAINT "cities_to_zip_codes_zip_code_id_zip_codes_id_fk" FOREIGN KEY ("zip_code_id") REFERENCES "public"."zip_codes"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_addresses" ADD CONSTRAINT "users_to_addresses_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users_to_addresses" ADD CONSTRAINT "users_to_addresses_address_id_addresses_id_fk" FOREIGN KEY ("address_id") REFERENCES "public"."addresses"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "unique_full_address" ON "addresses" USING btree ("address1",COALESCE("address2", ''),"zip_code_id");