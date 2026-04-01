ALTER TABLE "addresses" RENAME COLUMN "address1" TO "street_address";--> statement-breakpoint
ALTER TABLE "addresses" RENAME COLUMN "address2" TO "secondary_address";--> statement-breakpoint
ALTER TABLE "zip_codes" DROP CONSTRAINT "zip_codes_zipCode_unique";--> statement-breakpoint
DROP INDEX "unique_full_address";--> statement-breakpoint
CREATE UNIQUE INDEX "unique_full_address" ON "addresses" USING btree ("street_address",COALESCE("secondary_address", ''),"zip_code_id","recipient_id");--> statement-breakpoint
ALTER TABLE "zip_codes" ADD CONSTRAINT "zip_codes_ZIPCode_unique" UNIQUE("zip_code");
