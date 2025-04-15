CREATE TABLE `invitations` (
	`label` text NOT NULL,
	`code` text(5) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE `invited_person` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`rsvp` integer,
	`invitationCode` text NOT NULL,
	FOREIGN KEY (`invitationCode`) REFERENCES `invitations`(`code`) ON UPDATE no action ON DELETE cascade
);
