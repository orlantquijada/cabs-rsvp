"use server";

import {
	ServerValidateError,
	createServerValidate,
} from "@tanstack/react-form/nextjs";
import { revalidatePath } from "next/cache";
import * as v from "valibot";
import { selectPeopleSchema } from "~/db/schema";
import { createInvitation, deleteInvitation } from "~/utils/api";
import { formOpts } from "./create-invitation";

const serverValidate = createServerValidate({
	...formOpts,
	onServerValidate: () => {},
});

export const createInvitationAction = async (
	_: unknown,
	formData: FormData,
) => {
	try {
		const validatedData = await serverValidate(formData);
		const transformDataSchema = v.object({
			label: v.string(),
			guests: selectPeopleSchema,
		});
		const parsedData = v.parse(transformDataSchema, validatedData);
		createInvitation({
			label: parsedData.label,
			people: parsedData.guests,
		});
		revalidatePath("/");
	} catch (e) {
		if (e instanceof ServerValidateError) {
			return e.formState;
		}

		throw e;
	}
};

export const deleteInvitationAction = async (id: number) => {
	deleteInvitation(id);
	revalidatePath("/");
};
