"use client";

import Image from "next/image";

import type { GetInvitationValues } from "~/utils/api";
import arc from "../assets/images/arc view.png";
import hero from "../assets/images/hero.png";
import heroText from "../assets/images/hero text.png";
import RSVPForm from "./RSVPForm";

type Props = {
	invitation: NonNullable<GetInvitationValues>;
};

export default function MissingRSVP({ invitation }: Props) {
	return (
		<div>
			<div className="min-h-screen w-full flex items-center justify-center flex-col px-6 gap-8">
				<Image src={hero} alt="hero" className="mt-20" />
				<Image src={heroText} alt="hero text" />
				<p className="text-brand">Hello, {invitation.label} you are invited!</p>

				{/* {invitation.invitedPeople.length > 1 && ( */}
				{/* 	<ul className="flex flex-col items-center text-brand"> */}
				{/* 		{invitation.invitedPeople.map((person) => ( */}
				{/* 			<li key={person.id}>{person.name}</li> */}
				{/* 		))} */}
				{/* 	</ul> */}
				{/* )} */}

				<RSVPForm invitedPeople={invitation.invitedPeople} />
			</div>

			<div className="m-4 md:m-8 grid place-items-center">
				<Image src={arc} alt="hero" />
			</div>
		</div>
	);
}
