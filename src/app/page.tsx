import AddInvitationForm from "~/components/AddInvitationForm";
import InvitationsDataTable from "~/components/InvitationsDataTable";
import { getInvitedPeople } from "~/utils/api";

export default async function Home() {
	const guests = await getInvitedPeople();

	return (
		<div className="h-full grid md:grid-cols-12 gap-10 py-10">
			<div className="flex flex-col md:col-span-7 px-5">
				<h1 className="text-3xl font-semibold tracking-tight transition-colors mb-4">
					Guests
				</h1>

				<InvitationsDataTable
					guests={guests.map((guest) => ({
						...guest,
						invitationLabel: guest.invitation.label,
						invitedPeople: guest.invitation.invitedPeople,
					}))}
				/>
			</div>

			<div className="md:col-span-5 bg-sidebar border border-sidebar-border py-8 px-5 md:px-8 md:rounded-l-4xl">
				<AddInvitationForm />
			</div>
		</div>
	);
}

export const dynamic = "force-dynamic";
