ALTER TABLE "user_oauth_accounts" DROP CONSTRAINT "user_oauth_accounts_provider_account_id_provider_pk";--> statement-breakpoint
ALTER TABLE "cities_to_zip_codes" DROP CONSTRAINT "cities_to_zip_codes_city_id_zip_code_id_pk";--> statement-breakpoint
ALTER TABLE "users_to_addresses" DROP CONSTRAINT "users_to_addresses_user_id_address_id_address_type_pk";--> statement-breakpoint
ALTER TABLE "user_oauth_accounts" ADD CONSTRAINT "user_oauth_accounts_pk" PRIMARY KEY("provider_account_id","provider");--> statement-breakpoint
ALTER TABLE "cities_to_zip_codes" ADD CONSTRAINT "cities_to_zip_codes_pk" PRIMARY KEY("city_id","zip_code_id");--> statement-breakpoint
ALTER TABLE "users_to_addresses" ADD CONSTRAINT "users_to_addresses_pk" PRIMARY KEY("user_id","address_id","address_type");