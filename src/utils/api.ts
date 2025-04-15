import { eq } from "drizzle-orm";
import { parse } from "valibot";
import { db } from "~/db/client";
import {
	type CreateInvitationBody,
	Invitation,
	type InvitationValues,
	InvitedPerson,
	type InvitedPersonValues,
	type UpdateInvitationBody,
	UpdateInvitedPersonSchema,
} from "~/db/schema";

export async function createFullInvitation(
	input: CreateInvitationBody,
): Promise<string> {
	const { label, people } = input;

	const result = await db.transaction(async (tx) => {
		const [newInvitation] = await tx
			.insert(Invitation)
			.values({
				label: label,
			})
			.returning({ insertedId: Invitation.code });

		if (!newInvitation?.insertedId) {
			throw new Error("Failed to create invitation record.");
		}

		const invitationId = newInvitation.insertedId;

		if (people.length > 0) {
			const peopleToInsert = people.map((person) => ({
				...person,
				invitationCode: invitationId,
			}));

			await tx.insert(InvitedPerson).values(peopleToInsert);
		}

		return invitationId;
	});

	return result;
}

export async function getInvitedPeople() {
	return db.query.InvitedPerson.findMany({
		with: { invitation: { with: { invitedPeople: true } } },
	});
}
export type InvitedPeople = Awaited<ReturnType<typeof getInvitedPeople>>;

export async function getInvitedPerson(id: InvitedPersonValues["id"]) {
	return db.query.InvitedPerson.findFirst({
		where: eq(InvitedPerson.id, id),
	});
}

export async function getInvitation(code: InvitationValues["code"]) {
	return db.query.Invitation.findFirst({
		where: eq(Invitation.code, code),
		with: {
			invitedPeople: true,
		},
	});
}
export type GetInvitationValues = Awaited<ReturnType<typeof getInvitation>>;

export async function patchInvitation(
	id: InvitedPersonValues["id"],
	values: UpdateInvitationBody,
) {
	return db
		.update(InvitedPerson)
		.set(parse(UpdateInvitedPersonSchema, values))
		.where(eq(InvitedPerson.id, id));
}

export async function bulkRSVP(
	people: Pick<InvitedPersonValues, "id" | "rsvp">[],
) {
	await db.transaction(async (tx) => {
		for (const person of people) {
			await tx
				.update(InvitedPerson)
				.set({ rsvp: person.rsvp })
				.where(eq(InvitedPerson.id, person.id));
		}
	});
}

export async function deleteInvitation(code: InvitationValues["code"]) {
	return db.delete(Invitation).where(eq(Invitation.code, code));
}

export async function deleteInvitedPerson(id: InvitedPersonValues["id"]) {
	return db.delete(InvitedPerson).where(eq(InvitedPerson.id, id));
}
