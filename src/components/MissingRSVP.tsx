"use client";

import type * as v from "valibot";

import type { InvitationSelectSchema } from "~/db/schema";
import { Button } from "./Button";

type Props = {
	invitation: v.InferOutput<typeof InvitationSelectSchema>;
	rsvpAction: (id: number, code: string, rsvp: boolean) => Promise<void>;
};

export default function MissingRSVP({ invitation, rsvpAction }: Props) {
	return (
		<div className="flex flex-col">
			<h1 className="text-3xl font-semibold tracking-tight transition-colors mb-4">
				Invited People
			</h1>
			<ul className="ml-6 list-disc [&>li]:mt-2">
				{invitation.people.map((person) => (
					<li key={person}>{person}</li>
				))}
			</ul>

			<div>
				<p className="leading-7 mt-6 text-pretty">
					Please let us know if you'll be able to celebrate with us by{" "}
					<span className="font-semibold">Jan 25, 2025</span>
				</p>

				<div className="grid grid-cols-2 gap-2 mt-4">
					<Button
						type="button"
						variant="secondary"
						onClick={() => {
							rsvpAction(invitation.id, invitation.code, false);
						}}
					>
						No, I cannot attend
					</Button>
					<Button
						type="button"
						onClick={() => {
							rsvpAction(invitation.id, invitation.code, true);
						}}
					>
						Yes, I want to attend
					</Button>
				</div>
			</div>
		</div>
	);
}
