import AddInvitationForm from "~/components/AddInvitationForm";
import InvitationsDataTable from "~/components/InvitationsDataTable";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { loginFormAction, logout } from "~/lib/actions";
import { getSession } from "~/lib/auth";
import { getInvitedPeople } from "~/utils/api";

export default async function Home() {
	const session = await getSession();

	if (session.isLoggedIn) {
		const guests = await getInvitedPeople();

		return (
			<div>
				<header className="py-3 px-4 flex w-full justify-end">
					<form action={logout}>
						<Button type="submit">Logout</Button>
					</form>
				</header>
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
			</div>
		);
	}

	return (
		<div className="h-screen w-screen grid place-items-center">
			<form action={loginFormAction} className="flex flex-col w-full max-w-xs">
				<Label htmlFor="password">Password</Label>
				<Input className="mt-3" id="password" type="password" name="password" />
				<Button type="submit" className="self-start w-fit mt-4">
					Login
				</Button>
			</form>
		</div>
	);
}

export const dynamic = "force-dynamic";
