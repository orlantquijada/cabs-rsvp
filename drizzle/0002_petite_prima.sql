DROP INDEX "invitations_code_unique";--> statement-breakpoint
DROP INDEX "people_code_unique";--> statement-breakpoint
ALTER TABLE `invitations` ALTER COLUMN "people" TO "people" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `invitations_code_unique` ON `invitations` (`code`);--> statement-breakpoint
CREATE UNIQUE INDEX `people_code_unique` ON `people` (`code`);