import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-valibot";
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

export const People = sqliteTable("people", {
	id: integer().primaryKey({ autoIncrement: true }).notNull(),
	name: text().notNull(),
	rsvp: integer({ mode: "number" }),
	code: text("code", { length: 5 })
		.notNull()
		.unique()
		.$defaultFn(() => generateRandomCode(5)),
});

export const CreatePeopleSchema = createInsertSchema(People, {
	name: v.string(),
	code: v.optional(v.pipe(v.string(), v.maxLength(5))),
	rsvp: v.pipe(
		v.nullable(v.boolean(), null),
		v.transform((input) => {
			if (input) return 1;
			if (input === null) return null;
			return 0;
		}),
	),
});
