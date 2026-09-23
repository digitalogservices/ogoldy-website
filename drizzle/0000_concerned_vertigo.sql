CREATE TABLE `inquiries` (
	`id` text PRIMARY KEY NOT NULL,
	`company` text NOT NULL,
	`contact_name` text NOT NULL,
	`email` text NOT NULL,
	`phone` text NOT NULL,
	`location` text NOT NULL,
	`asset_type` text NOT NULL,
	`quantity` text NOT NULL,
	`notes` text NOT NULL,
	`files_json` text DEFAULT '[]' NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL
);
