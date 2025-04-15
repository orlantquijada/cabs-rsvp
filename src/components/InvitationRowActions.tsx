import { MoreVerticalIcon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import {
	deleteInvitationAction,
	deleteInvitedPersonAction,
	type getInvitationAction,
} from "~/lib/actions";
import { cn } from "~/utils/cn";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "./ui/alert-dialog";
import { Button } from "./ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { ScrollArea } from "./ui/scroll-area";

type Guest = {
	rsvp: boolean | null;
	name: string;
	id: number;
	invitationCode: string;
	invitationLabel: string;
	invitedPeople: {
		rsvp: boolean | null;
		name: string;
		id: number;
	}[];
};

type Props = { guest: Guest };

export default function InvitationRowActions({ guest }: Props) {
	const [open, setOpen] = useState(false);
	const { invitedPeople, invitationCode, invitationLabel } = guest;

	const router = useRouter();

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						className="flex size-8 text-muted-foreground data-[state=open]:bg-muted"
						size="icon"
					>
						<MoreVerticalIcon size={16} />
						<span className="sr-only">Open menu</span>
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end">
					<DropdownMenuItem
						onClick={() => {
							const url = `${window.location.origin}/${guest.invitationCode}`;
							if (window.isSecureContext && navigator.clipboard)
								navigator.clipboard.writeText(url);
						}}
					>
						Copy invite link
					</DropdownMenuItem>
					<DialogTrigger asChild>
						<DropdownMenuItem>Open invitation details</DropdownMenuItem>
					</DialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>

			<DialogContent className="sm:max-w-[425px]">
				<Fragment>
					<DialogHeader>
						<small className="text-muted-foreground text-xs font-medium leading-none">
							Invitation Details
						</small>
						<DialogTitle className="mt-2 flex items-center justify-center">
							{invitationLabel}
							<AlertDialog>
								<AlertDialogTrigger asChild>
									<Button
										variant="ghost"
										size="icon"
										className="inline-flex self-end ml-auto"
									>
										<Trash size={16} />
									</Button>
								</AlertDialogTrigger>
								<AlertDialogContent>
									<AlertDialogHeader>
										<AlertDialogTitle>
											Are you absolutely sure?
										</AlertDialogTitle>
										<AlertDialogDescription>
											This action cannot be undone. This will permanently delete
											your invitation.
										</AlertDialogDescription>
									</AlertDialogHeader>
									<AlertDialogFooter>
										<AlertDialogCancel>Cancel</AlertDialogCancel>
										<AlertDialogAction
											onClick={async () => {
												deleteInvitationAction(invitationCode);
												router.refresh();
												setOpen(false);
											}}
										>
											Continue
										</AlertDialogAction>
									</AlertDialogFooter>
								</AlertDialogContent>
							</AlertDialog>
						</DialogTitle>
					</DialogHeader>
					<div className="mt-4">
						<h3 className="font-medium tracking-tight">Attendees</h3>
						<ScrollArea className="max-h-[50vh] h-full">
							<ul className="ml-6 list-disc [&>li]:mt-2">
								{invitedPeople.map((person) => (
									<li key={person.id} className="text-sm">
										<span className="mr-2">{person.name}</span>

										<span className="relative rounded px-[0.3rem] bg-muted py-[0.2rem] font-mono text-sm font-semibold">
											{person.rsvp === null ? "–" : person.rsvp ? "yes" : "no"}
										</span>
									</li>
								))}
							</ul>
						</ScrollArea>
					</div>
				</Fragment>
			</DialogContent>
		</Dialog>
	);
}
