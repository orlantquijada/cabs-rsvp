import { eq } from "drizzle-orm";
import { unstable_cache } from "next/cache";
import { type InferInput, array, parse } from "valibot";
import { db } from "~/db/client";
import {
	CreateInvitationSchema,
	Invitation,
	InvitationSelectSchema,
	UpdateInvitationSchema,
} from "~/db/schema";

export const createInvitation = async (
	values: InferInput<typeof CreateInvitationSchema>,
) => {
	return db.insert(Invitation).values(parse(CreateInvitationSchema, values));
};

export const patchInvitation = async (
	id: number,
	values: InferInput<typeof UpdateInvitationSchema>,
) => {
	return db
		.update(Invitation)
		.set(parse(UpdateInvitationSchema, values))
		.where(eq(Invitation.id, id));
};

export const initationKeys = {
	all: () => "invitations",
	code: (id: string) => `invitations-${id}`,
};

export const getInvitations = async () => {
	const invitationsSchema = array(InvitationSelectSchema);
	const invitationsQuery = unstable_cache(
		async () => await db.query.Invitation.findMany(),
		[initationKeys.all()],
		{ revalidate: 10, tags: [initationKeys.all()] },
	);

	const parsedinvitations = parse(invitationsSchema, await invitationsQuery());

	return parsedinvitations;
};

export const getInvitation = async (code: string) => {
	const invitationQuery = unstable_cache(
		async () =>
			await db.query.Invitation.findFirst({ where: eq(Invitation.code, code) }),
		[initationKeys.code(code)],
		{
			revalidate: 10,
			tags: [initationKeys.code(code)],
		},
	);

	const invitation = parse(InvitationSelectSchema, await invitationQuery());
	return invitation;
};
