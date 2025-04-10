import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
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
	people: text().notNull(),
	label: text().notNull(),
	rsvp: integer({ mode: "number" }),
	code: text("code", { length: 5 })
		.notNull()
		.unique()
		.$defaultFn(() => generateRandomCode(5)),
});

const PEOPLE_DELIM = "|";

export const mutatePeopleSchema = v.pipe(
	v.array(v.string()),
	v.transform((input) => input.join(PEOPLE_DELIM)),
);
const mutateRsvpSchema = v.pipe(
	v.optional(v.boolean()),
	v.transform((input) => {
		if (input === undefined) return null;
		return input ? 1 : 0;
	}),
);

export const CreateInvitationSchema = createInsertSchema(Invitation, {
	people: mutatePeopleSchema,
	rsvp: mutateRsvpSchema,
});

export const UpdateInvitationSchema = createUpdateSchema(Invitation, {
	people: v.optional(mutatePeopleSchema),
	rsvp: mutateRsvpSchema,
});

export const selectPeopleSchema = v.pipe(
	v.string(),
	v.transform((input) => input.split("|")),
);

export const InvitationSelectSchema = createSelectSchema(Invitation, {
	people: v.pipe(
		v.string(),
		v.transform((input) => input.split("|")),
	),
	rsvp: v.pipe(
		v.nullable(v.number()),
		v.transform((input) => {
			if (input === null) return null;

			return Boolean(input);
		}),
	),
});
