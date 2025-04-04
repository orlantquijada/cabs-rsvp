DROP INDEX "invitations_code_unique";--> statement-breakpoint
ALTER TABLE `invitations` ALTER COLUMN "label" TO "label" text NOT NULL;--> statement-breakpoint
CREATE UNIQUE INDEX `invitations_code_unique` ON `invitations` (`code`);