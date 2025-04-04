"use client";

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { Delete, MoreVerticalIcon, Trash } from "lucide-react";
import { useMemo, useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import Copy from "~/icons/copy";
import { deleteInvitationAction } from "~/lib/actions";
import InvitationRowActions from "./InvitationRowActions";
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
	DialogDescription,
	DialogFooter,
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
import { Input } from "./ui/input";

type Guest = {
	id: number;
	people: string[];
	rsvp: boolean | null;
	code: string;
	guest: string;
	label: string;
};

type Props = {
	guests: Guest[];
};

export default function InvitationsDataTable({ guests }: Props) {
	const [globalFilter, setGlobalFilter] = useState("");

	const columns: ColumnDef<Guest>[] = useMemo(
		() => [
			{
				accessorKey: "guest",
				header: "Guest",
			},
			{
				accessorKey: "label",
				header: "Label",
			},
			{
				accessorKey: "rsvp",
				header: "RSVP",
				accessorFn: ({ rsvp }) => (rsvp === null ? "-" : rsvp ? "yes" : "no"),
				cell: ({ getValue }) => {
					const value = getValue();

					return (
						<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] text-xs font-semibold">
							{value === "-" ? "–" : (value as string)}
						</code>
					);
				},
			},
			{
				accessorKey: "code",
				header: "Code",
				cell: ({ row }) => {
					const guest = row.original;
					return (
						<span className="inline-flex items-center justify-center gap-1.5">
							<code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] text-xs font-semibold">
								{row.original.code}
							</code>

							<Button
								size="icon"
								variant="ghost"
								className="transition-all active:scale-95"
								onClick={() => {
									const url = `${window.location.origin}/${guest.code}`;
									if (window.isSecureContext && navigator.clipboard)
										navigator.clipboard.writeText(url);
								}}
							>
								<Copy size={16} />
							</Button>
						</span>
					);
				},
			},
			{
				id: "actions",
				cell: ({ row }) => {
					const guest = row.original;

					return <InvitationRowActions guest={guest} />;
				},
			},
		],
		[],
	);

	const table = useReactTable({
		data: guests,
		columns,
		getCoreRowModel: getCoreRowModel(),
		getPaginationRowModel: getPaginationRowModel(),
		getFilteredRowModel: getFilteredRowModel(),
		state: {
			globalFilter,
		},
		onGlobalFilterChange: setGlobalFilter,
	});

	return (
		<div>
			<div className="flex items-center py-4">
				<Input
					className="w-1/2"
					placeholder="Search guests..."
					value={globalFilter ?? ""}
					onChange={(e) => {
						setGlobalFilter(e.target.value);
					}}
				/>
			</div>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{flexRender(
											header.column.columnDef.header,
											header.getContext(),
										)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>
					<TableBody>
						{table.getRowModel().rows.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext(),
											)}
										</TableCell>
									))}
								</TableRow>
							))
						) : (
							<TableRow>
								<TableCell
									colSpan={columns.length}
									className="h-24 text-center"
								>
									No results.
								</TableCell>
							</TableRow>
						)}
					</TableBody>
				</Table>
			</div>

			<div className="flex w-full items-center justify-end gap-4">
				<span className="flex w-fit items-center justify-center text-sm font-medium">
					Page {table.getState().pagination.pageIndex + 1} of{" "}
					{table.getPageCount()}
				</span>

				<div className="space-x-2 py-4">
					<Button
						variant="outline"
						size="sm"
						className="w-20"
						onClick={() => table.previousPage()}
						disabled={!table.getCanPreviousPage()}
					>
						Previous
					</Button>
					<Button
						variant="outline"
						size="sm"
						className="w-20"
						onClick={() => table.nextPage()}
						disabled={!table.getCanNextPage()}
					>
						Next
					</Button>
				</div>
			</div>
		</div>
	);
}
