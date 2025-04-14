"use client";

import type * as v from "valibot";

import Image from "next/image";
import { useRouter } from "next/navigation";
import type { InvitationValues } from "~/db/schema";

import { rsvpAction } from "~/lib/actions";
import type { GetInviationFromCodeValues } from "~/utils/api";
import arc from "../assets/images/arc view.png";
import hero from "../assets/images/hero.png";
import heroText from "../assets/images/hero text.png";

type Props = {
	guest: NonNullable<GetInviationFromCodeValues>;
};

export default function MissingRSVP({ guest }: Props) {
	const router = useRouter();
	const { invitation } = guest;

	return (
		<div>
			<div className="h-screen w-full flex items-center justify-center flex-col px-6 gap-8">
				<Image src={hero} alt="hero" />
				<Image src={heroText} alt="hero text" />

				<p className="text-brand">Hello, {invitation.label} you are invited!</p>

				{invitation.invitedPeople.length > 1 && (
					<ul className="flex flex-col items-center text-brand">
						{invitation.invitedPeople.map((person) => (
							<li key={person.code}>{person.name}</li>
						))}
					</ul>
				)}

				<div className="grid grid-cols-2 gap-2">
					<button
						className="h-10 px-4 bg-brand text-on-brand text-base font-sans border border-transparent grid place-items-center"
						type="button"
						style={{ borderRadius: 8 }}
						onClick={() => {
							rsvpAction(guest.code, true);
							router.refresh();
						}}
					>
						I am going
					</button>
					<button
						className="h-10 px-4 bg-transparent text-brand text-base font-sans border border-brand grid place-items-center"
						style={{ borderRadius: 8 }}
						type="button"
						onClick={() => {
							rsvpAction(guest.code, false);
							router.refresh();
						}}
					>
						Not going
					</button>
				</div>
			</div>

			<div className="m-4 md:m-8 grid place-items-center">
				<Image src={arc} alt="hero" />
			</div>
		</div>
	);
}
