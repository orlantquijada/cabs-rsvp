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
): Promise<number> {
	const { label, people } = input;

	const result = await db.transaction(async (tx) => {
		const [newInvitation] = await tx
			.insert(Invitation)
			.values({
				label: label,
			})
			.returning({ insertedId: Invitation.id });

		if (!newInvitation?.insertedId) {
			throw new Error("Failed to create invitation record.");
		}

		const invitationId = newInvitation.insertedId;

		if (people.length > 0) {
			const peopleToInsert = people.map((person) => ({
				name: person,
				invitationId: invitationId,
			}));

			await tx.insert(InvitedPerson).values(peopleToInsert);
		}

		return invitationId;
	});

	return result;
}

export async function getInvitedPeople() {
	return db.query.InvitedPerson.findMany({ with: { invitation: true } });
}
export type InvitedPeople = Awaited<ReturnType<typeof getInvitedPeople>>;

export async function getInvitedPerson(code: InvitedPersonValues["code"]) {
	return db.query.InvitedPerson.findFirst({
		where: eq(InvitedPerson.code, code),
	});
}

export async function getInvitationFromCode(code: InvitedPersonValues["code"]) {
	return db.query.InvitedPerson.findFirst({
		where: eq(InvitedPerson.code, code),
		with: {
			invitation: {
				with: { invitedPeople: true },
			},
		},
	});
}
export type GetInviationFromCodeValues = Awaited<
	ReturnType<typeof getInvitationFromCode>
>;

export async function getInvitation(id: InvitationValues["id"]) {
	return db.query.Invitation.findFirst({
		where: eq(Invitation.id, id),
		with: {
			invitedPeople: true,
		},
	});
}

export async function patchInvitation(
	code: InvitedPersonValues["code"],
	values: UpdateInvitationBody,
) {
	return db
		.update(InvitedPerson)
		.set(parse(UpdateInvitedPersonSchema, values))
		.where(eq(InvitedPerson.code, code));
}

export async function deleteInvitation(id: InvitationValues["id"]) {
	return db.delete(Invitation).where(eq(Invitation.id, id));
}

export async function deleteInvitedPerson(code: InvitedPersonValues["code"]) {
	return db.delete(InvitedPerson).where(eq(InvitedPerson.code, code));
}
