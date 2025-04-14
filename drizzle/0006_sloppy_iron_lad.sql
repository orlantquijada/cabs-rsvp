CREATE TABLE `invited_person` (
	`name` text NOT NULL,
	`rsvp` integer,
	`code` text(5) PRIMARY KEY NOT NULL,
	`invitationId` integer NOT NULL,
	FOREIGN KEY (`invitationId`) REFERENCES `invitations`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
DROP INDEX `invitations_code_unique`;--> statement-breakpoint
ALTER TABLE `invitations` DROP COLUMN `people`;--> statement-breakpoint
ALTER TABLE `invitations` DROP COLUMN `rsvp`;--> statement-breakpoint
ALTER TABLE `invitations` DROP COLUMN `code`;