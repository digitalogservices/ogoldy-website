CREATE INDEX `idx_inquiries_email_created` ON `inquiries` (`email`,`created_at`);--> statement-breakpoint
CREATE INDEX `idx_inquiries_request_hash` ON `inquiries` (`request_hash`);