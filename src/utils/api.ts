import type { InferInput } from "valibot";
import { db } from "~/db/client";
import { type CreatePeopleSchema, People } from "~/db/schema";

export const createPerson = (values: InferInput<typeof CreatePeopleSchema>) => {
	// @ts-ignore
	return db.insert(People).values(values);
};
