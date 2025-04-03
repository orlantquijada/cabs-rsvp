import AddInvitationForm from "~/components/AddInvitationForm";

export default async function Home() {
	return (
		<div className="h-full grid grid-cols-2 py-10 px-5">
			<div className="flex flex-col">
				<h1 className="text-3xl font-semibold tracking-tight transition-colors mb-4">
					Invited People
				</h1>
			</div>

			<AddInvitationForm />
		</div>
	);
}
