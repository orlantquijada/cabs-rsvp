import { notFound } from "next/navigation";
import HasRSVP from "~/components/HasRSVP";
import MissingRSVP from "~/components/MissingRSVP";

import { getInvitationFromCode } from "~/utils/api";
import { tryCatch } from "~/utils/try-catch";

export default async function InvitationPage({
	params,
}: { params: Promise<{ code: string }> }) {
	const { code } = await params;

	const { data: guest, error } = await tryCatch(getInvitationFromCode(code));

	if (error) notFound();

	return (
		<div>
			{guest?.rsvp !== null ? (
				<HasRSVP guest={guest} />
			) : (
				<MissingRSVP guest={guest} />
			)}
		</div>
	);
}

export const dynamic = "force-dynamic";
