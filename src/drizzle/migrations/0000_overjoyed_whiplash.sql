CREATE TYPE "public"."role" AS ENUM('customer', 'artist', 'musician');--> statement-breakpoint
CREATE TABLE "users" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(255) NOT NULL,
	"password" varchar(255) NOT NULL,
	"first_name" varchar(255),
	"last_name" varchar(255),
	"birthday" date,
	"address_1" varchar(255),
	"address_2" varchar(255),
	"city" varchar(50),
	"state_abbreviation" varchar(2),
	"zip_code" integer,
	"role" "role",
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
