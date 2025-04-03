CREATE TABLE `people` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`rsvp` integer,
	`code` text(5) NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `people_code_unique` ON `people` (`code`);