import { revalidateTag } from "next/cache";
import { notFound } from "next/navigation";
import type * as v from "valibot";
import MissingRSVP from "~/components/MissingRSVP";

import type { InvitationSelectSchema } from "~/db/schema";
import { getInvitation, initationKeys, patchInvitation } from "~/utils/api";
import { tryCatch } from "~/utils/try-catch";

export default async function InvitationPage({
	params,
}: { params: Promise<{ code: string }> }) {
	const { code } = await params;

	const { data: invitation, error } = await tryCatch(getInvitation(code));

	if (error) notFound();

	return (
		<div className="h-full max-w-lg mx-auto py-10 px-5">
			{invitation.rsvp !== null ? (
				<HasRSVP invitation={invitation} />
			) : (
				<MissingRSVP invitation={invitation} rsvpAction={rsvpAction} />
			)}
		</div>
	);
}

function HasRSVP({
	invitation,
}: { invitation: v.InferOutput<typeof InvitationSelectSchema> }) {
	return (
		<div className="flex flex-col">
			<h1 className="text-3xl font-semibold tracking-tight transition-colors mb-4">
				RSVP Received
			</h1>
			<ul className="ml-6 list-disc [&>li]:mt-2">
				{invitation.people.map((person) => (
					<li key={person}>{person}</li>
				))}
			</ul>

			<p className="leading-7 [&:not(:first-child)]:mt-6 text-pretty">
				{invitation.rsvp
					? "We've received your RSVP. We're so excited to celebrate with you!"
					: "We've received your RSVP. We're sorry you can't make it, but we appreciate you letting us know."}
			</p>
		</div>
	);
}

const rsvpAction = async (id: number, code: string, rsvp: boolean) => {
	"use server";

	patchInvitation(id, { rsvp });
	// revalidateTag(initationKeys.code(code));
};

export const dynamic = "force-dynamic";
