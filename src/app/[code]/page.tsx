import { notFound } from "next/navigation";
import HasRSVP from "~/components/HasRSVP";
import MissingRSVP from "~/components/MissingRSVP";
import { getInvitation } from "~/utils/api";

import { tryCatch } from "~/utils/try-catch";

export default async function InvitationPage({
	params,
}: { params: Promise<{ code: string }> }) {
	const { code } = await params;

	const { data: invitation, error } = await tryCatch(getInvitation(code));

	const hasResponse = invitation?.invitedPeople.some(
		({ rsvp }) => rsvp !== null,
	);
	const didRsvpYes = [...(invitation?.invitedPeople || [])].some(
		({ rsvp }) => rsvp,
	);

	if (error) notFound();

	return (
		<div>
			{hasResponse ? (
				<HasRSVP didRsvpYes={didRsvpYes} />
			) : invitation ? (
				<MissingRSVP invitation={invitation} />
			) : null}
		</div>
	);
}

export const dynamic = "force-dynamic";
