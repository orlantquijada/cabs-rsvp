import { relations } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
	CreateInsertSchema,
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-valibot";
import * as v from "valibot";

function generateRandomCode(length = 5): string {
	const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
	let result = "";
	const charactersLength = characters.length;
	for (let i = 0; i < length; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}
	return result;
}

export const Invitation = sqliteTable("invitations", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	label: text().notNull(),
});

export const InvitedPerson = sqliteTable("invited_person", {
	name: text().notNull(),
	rsvp: integer({ mode: "boolean" }),
	code: text("code", { length: 5 })
		.primaryKey()
		.notNull()
		.$defaultFn(() => generateRandomCode(5)),

	invitationId: integer()
		.notNull()
		.references(() => Invitation.id, {
			onDelete: "cascade",
		}),
});

export const invitationRelations = relations(Invitation, ({ many }) => ({
	invitedPeople: many(InvitedPerson),
}));

export const invitedPersonRelations = relations(InvitedPerson, ({ one }) => ({
	invitation: one(Invitation, {
		fields: [InvitedPerson.invitationId],
		references: [Invitation.id],
	}),
}));

const CreateInvitationSchema = v.object({
	label: v.string(),
	people: v.array(v.string()),
});
export type CreateInvitationBody = v.InferInput<typeof CreateInvitationSchema>;

const SelectInvitedPersonSchema = createSelectSchema(InvitedPerson);
export type InvitedPersonValues = v.InferInput<
	typeof SelectInvitedPersonSchema
>;

export const UpdateInvitedPersonSchema = createUpdateSchema(InvitedPerson);
export type UpdateInvitationBody = v.InferInput<
	typeof UpdateInvitedPersonSchema
>;

const SelectInvitationSchema = createSelectSchema(Invitation);
export type InvitationValues = v.InferInput<typeof SelectInvitationSchema>;
