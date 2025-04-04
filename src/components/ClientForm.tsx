"use client";

// Notice the import is from `react-form`, not `react-form/nextjs`
import {
	mergeForm,
	useForm,
	useStore,
	useTransform,
} from "@tanstack/react-form";
import { initialFormState } from "@tanstack/react-form/nextjs";
import { useActionState } from "react";
import someAction from "./action";
import { formOpts } from "./shared-code";

export const ClientComp = () => {
	const [state, action] = useActionState(someAction, initialFormState);

	const form = useForm({
		...formOpts,
		transform: useTransform((baseForm) => mergeForm(baseForm, state!), [state]),
	});

	const formErrors = useStore(form.store, (formState) => formState.errors);

	return (
		<form action={action as never} onSubmit={() => form.handleSubmit()}>
			{formErrors.map((error) => (
				<p key={error as string}>{error}</p>
			))}

			<form.Field
				name="age"
				validators={{
					onChange: ({ value }) =>
						value < 8 ? "Client validation: You must be at least 8" : undefined,
				}}
			>
				{(field) => {
					return (
						<div>
							<input
								name="age"
								type="number"
								value={field.state.value}
								onChange={(e) => field.handleChange(e.target.valueAsNumber)}
							/>
							{field.state.meta.errors.map((error) => (
								<p key={error as string}>{error}</p>
							))}
						</div>
					);
				}}
			</form.Field>
			<form.Subscribe
				selector={(formState) => [formState.canSubmit, formState.isSubmitting]}
			>
				{([canSubmit, isSubmitting]) => (
					<button type="submit" disabled={!canSubmit}>
						{isSubmitting ? "..." : "Submit"}
					</button>
				)}
			</form.Subscribe>
		</form>
	);
};
