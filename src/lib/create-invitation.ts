import { formOptions } from "@tanstack/react-form/nextjs";
import * as v from "valibot";

export const formOpts = formOptions({
	defaultValues: {
		people: [] as Array<{ name: string }>,
		label: "",
	},
	validators: {
		onChange: v.object({
			people: v.pipe(
				v.array(v.object({ name: v.string() })),
				v.minLength(1, "Guest is required."),
			),
			label: v.pipe(v.string(), v.nonEmpty("Invitation label is required.")),
		}),
	},
});
