ALTER TABLE `inquiries` ADD `source_page` text DEFAULT '' NOT NULL;
ALTER TABLE `inquiries` ADD `referrer` text DEFAULT '' NOT NULL;
ALTER TABLE `inquiries` ADD `utm_json` text DEFAULT '{}' NOT NULL;
ALTER TABLE `inquiries` ADD `email_status` text DEFAULT 'pending' NOT NULL;
ALTER TABLE `inquiries` ADD `trello_status` text DEFAULT 'pending' NOT NULL;
CREATE TABLE `analytics_events` (`id` text PRIMARY KEY NOT NULL,`event_name` text NOT NULL,`session_id` text NOT NULL,`lead_id` text,`path` text NOT NULL,`referrer` text DEFAULT '' NOT NULL,`utm_json` text DEFAULT '{}' NOT NULL,`label` text DEFAULT '' NOT NULL,`created_at` integer DEFAULT (unixepoch()) NOT NULL);
CREATE INDEX `idx_events_name_created` ON `analytics_events` (`event_name`,`created_at`);
CREATE INDEX `idx_events_lead` ON `analytics_events` (`lead_id`);
