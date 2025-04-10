"use client";

import {
	createFormHook,
	createFormHookContexts,
	mergeForm,
	useTransform,
} from "@tanstack/react-form";
import { formOptions, initialFormState } from "@tanstack/react-form/nextjs";
import { X } from "lucide-react";

import { useRouter } from "next/navigation";
import { useActionState, useState, useTransition } from "react";
import * as v from "valibot";
import type { CreateInvitationSchema } from "~/db/schema";
import { createInvitationAction } from "~/lib/actions";
import { formOpts } from "~/lib/create-invitation";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

const { fieldContext, formContext } = createFormHookContexts();
const { useAppForm } = createFormHook({
	fieldComponents: {
		Input,
	},
	formComponents: {
		Button,
	},
	fieldContext,
	formContext,
});

export default function AddInvitationForm() {
	const [state, formAction] = useActionState(
		createInvitationAction,
		initialFormState,
	);
	const [name, setName] = useState("");
	const router = useRouter();

	const form = useAppForm({
		...formOpts,
		transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]),
		onSubmit: ({ formApi }) => {
			formApi.reset();
			setName("");
			router.refresh();
		},
	});

	return (
		<form action={formAction} onSubmit={form.handleSubmit}>
			<h2 className="text-xl font-semibold tracking-tight transition-colors mb-4">
				Create Invitation
			</h2>

			<form.AppField name="label">
				{(field) => (
					<div className="mb-4">
						<label
							htmlFor="name"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Label
						</label>
						<field.Input
							id="label"
							className="md:w-1/2 mt-2"
							placeholder="Quijada Family"
							name={field.name}
							value={field.state.value}
							onChange={(e) => {
								field.handleChange(e.target.value);
							}}
						/>
						{field.state.meta.errors.length > 0 ? (
							<small className="text-sm font-medium leading-none text-destructive block mt-2">
								{field.state.meta.errors.map((err) => err?.message).join(", ")}
							</small>
						) : null}
					</div>
				)}
			</form.AppField>

			<form.AppField name="people" mode="array">
				{(field) => (
					<div>
						<input
							name="guests"
							type="hidden"
							value={field.state.value.map(({ name }) => name).join("|")}
						/>
						<label
							htmlFor="name"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							Guest Name
						</label>
						<field.Input
							id="name"
							className="md:w-1/2 mt-2"
							placeholder="Juan Tamad"
							value={name}
							onChange={(e) => setName(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter" && name) {
									e.preventDefault();
									field.pushValue({ name });
									setName("");
								}
							}}
						/>
						{field.state.meta.errors.length > 0 ? (
							<small className="text-sm font-medium leading-none text-destructive block mt-2">
								{field.state.meta.errors.map((err) => err?.message).join(", ")}
							</small>
						) : null}
						<div className="flex-wrap flex mt-2 gap-2">
							{field.state.value.map(({ name }, index) => (
								<Badge key={name} variant="default">
									{name}
									<button
										className="inline-flex"
										type="button"
										onClick={() => {
											field.removeValue(index);
										}}
									>
										<X size={12} />
									</button>
								</Badge>
							))}
						</div>
					</div>
				)}
			</form.AppField>

			<form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
				{([canSubmit, isSubmitting]) => (
					<form.Button type="submit" className="mt-6" disabled={!canSubmit}>
						{isSubmitting ? "..." : "Submit"}
					</form.Button>
				)}
			</form.Subscribe>
		</form>
	);
}
