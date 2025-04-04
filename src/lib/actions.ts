"use server";

import {
	ServerValidateError,
	createServerValidate,
	formOptions,
} from "@tanstack/react-form/nextjs";
import * as v from "valibot";
import { formOpts } from "./create-invitation";

const serverValidate = createServerValidate({
	...formOpts,
	onServerValidate: ({ value }) => {
		// __AUTO_GENERATED_PRINT_VAR_START__
		console.log(" value: %s", value); // __AUTO_GENERATED_PRINT_VAR_END__
		if (!value.people) return "Server validation: guests are required";
	},
});

export const createInvitationAction = async (
	prev: unknown,
	formData: FormData,
) => {
	try {
		const validatedData = await serverValidate(formData);
		console.log("validatedData", validatedData);
		// Persist the form data to the database
		// await sql`
		//   INSERT INTO users (name, email, password)
		//   VALUES (${validatedData.name}, ${validatedData.email}, ${validatedData.password})
		// `
	} catch (e) {
		if (e instanceof ServerValidateError) {
			return e.formState;
		}

		throw e;
	}
};
