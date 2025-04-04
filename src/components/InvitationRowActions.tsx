import { MoreVerticalIcon, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { deleteInvitationAction } from "~/lib/actions";
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
type Guest = {
	id: number;
	people: string[];
	rsvp: boolean | null;
	code: string;
	guest: string;
	label: string;
};

type Props = { guest: Guest };

export default function InvitationRowActions({ guest }: Props) {
	const [open, setOpen] = useState(false);
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
							const url = `${window.location.origin}/${guest.code}`;
							if (window.isSecureContext && navigator.clipboard)
								navigator.clipboard.writeText(url);
						}}
					>
						Copy invite link
					</DropdownMenuItem>
					<DialogTrigger asChild>
						<DropdownMenuItem onClick={() => {}}>
							Open invitation details
						</DropdownMenuItem>
					</DialogTrigger>
				</DropdownMenuContent>
			</DropdownMenu>

			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<small className="text-muted-foreground text-xs font-medium leading-none">
						Invitation Details
					</small>
					<DialogTitle className="mt-2 flex items-center justify-center">
						{guest.label}
						<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold ml-1.5">
							{guest.code}
						</code>
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
									<AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
									<AlertDialogDescription>
										This action cannot be undone. This will permanently delete
										your invitation.
									</AlertDialogDescription>
								</AlertDialogHeader>
								<AlertDialogFooter>
									<AlertDialogCancel>Cancel</AlertDialogCancel>
									<AlertDialogAction
										onClick={async () => {
											deleteInvitationAction(guest.id);
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
					<ul className="ml-6 list-disc [&>li]:mt-2">
						{guest.people.map((person) => (
							<li key={person} className="text-sm">
								{person}
							</li>
						))}
					</ul>
				</div>

				<div className="mt-4">
					<h3 className="font-medium tracking-tight mb-2">Did RSVP?</h3>
					<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
						{guest.rsvp === null ? "-" : guest.rsvp ? "yes" : "no"}
					</code>
				</div>

				<div className="mt-4">
					<h3 className="font-medium tracking-tight mb-2">Invite link</h3>
					<a
						className="text-sm hover:underline"
						href={
							typeof window === "object"
								? `${window.location.origin}/${guest.code}`
								: undefined
						}
					>
						{typeof window === "object"
							? `${window.location.origin}/${guest.code}`
							: null}
					</a>
				</div>
			</DialogContent>
		</Dialog>
	);
}
