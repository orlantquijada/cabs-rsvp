"use client";

import {
	type ColumnDef,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	useReactTable,
} from "@tanstack/react-table";
import { useMemo, useState, useTransition } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "~/components/ui/table";
import Copy from "~/icons/copy";
import { exportCsvAction } from "~/lib/actions";
import InvitationRowActions from "./InvitationRowActions";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

type Guest = {
	rsvp: boolean | null;
	code: string;
	name: string;
	invitationId: number;
	invitationLabel: string;
};

type Props = {
	guests: Guest[];
};

export default function InvitationsDataTable({ guests }: Props) {
	const [globalFilter, setGlobalFilter] = useState("");

	const columns: ColumnDef<Guest>[] = useMemo(
		() => [
			{
				accessorKey: "name",
				header: "Guest",
			},
			{
				accessorKey: "invitationLabel",
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
			<div className="flex items-center py-4 justify-between">
				<Input
					className="w-1/2"
					placeholder="Search guests..."
					value={globalFilter ?? ""}
					onChange={(e) => {
						setGlobalFilter(e.target.value);
					}}
				/>

				<ExportButton
					filename={`guests-${new Date().toLocaleString()}.csv`}
					data={guests.map((guest) => ({
						link: `${typeof window === "object" ? window.location.origin : ""}/${guest.code}`,
						name: guest.name,
						rsvp: guest.rsvp === null ? "-" : guest.rsvp ? "yes" : "no",
					}))}
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

function ExportButton({
	filename = "export.csv",
	data,
}: {
	filename: string;
	data: { rsvp: string; name: string; link: string }[];
}) {
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);

	const handleExport = () => {
		setError(null);

		startTransition(async () => {
			const result = await exportCsvAction(data);

			if (result.success && result.csvData) {
				try {
					const blob = new Blob([result.csvData], {
						type: "text/csv;charset=utf-8;",
					});

					const link = document.createElement("a");
					const url = URL.createObjectURL(blob);
					link.setAttribute("href", url);
					link.setAttribute("download", filename);
					link.style.visibility = "hidden";

					document.body.appendChild(link);
					link.click();
					document.body.removeChild(link);

					URL.revokeObjectURL(url);
				} catch (e) {
					console.error("Client-side download error:", e);
					setError("Failed to initiate download.");
				}
			} else {
				console.error("Export action failed:", result.error);
				setError(result.error || "An unknown error occurred during export.");
			}
		});
	};

	return (
		<div>
			<Button type="button" onClick={handleExport} disabled={isPending}>
				{isPending ? "Exporting..." : "Export to CSV"}
			</Button>
			{error && (
				<p style={{ color: "red", marginTop: "8px" }}>Error: {error}</p>
			)}
		</div>
	);
}
