CREATE TABLE `invitations` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`people` text,
	`rsvp` integer,
	`code` text(5) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `invitations_code_unique` ON `invitations` (`code`);