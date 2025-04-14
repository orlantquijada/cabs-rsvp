"use server";

import {
	ServerValidateError,
	createServerValidate,
} from "@tanstack/react-form/nextjs";
import { revalidatePath } from "next/cache";
import Papa from "papaparse";
import * as v from "valibot";
import type { InvitationValues, InvitedPersonValues } from "~/db/schema";
import {
	type InvitedPeople,
	createFullInvitation,
	deleteInvitation,
	deleteInvitedPerson,
	getInvitation,
	patchInvitation,
} from "~/utils/api";
import { formOpts } from "./create-invitation";

const serverValidate = createServerValidate({
	...formOpts,
	onServerValidate: () => {},
});

export async function createInvitationAction(_: unknown, formData: FormData) {
	try {
		const validatedData = await serverValidate(formData);
		const transformDataSchema = v.object({
			label: v.string(),
			guests: v.string(),
		});
		const parsedData = v.parse(transformDataSchema, validatedData);
		createFullInvitation({
			label: parsedData.label,
			people: parsedData.guests.split(","),
		});
		revalidatePath("/");
	} catch (e) {
		if (e instanceof ServerValidateError) {
			return e.formState;
		}

		throw e;
	}
}

export async function deleteInvitationAction(id: InvitationValues["id"]) {
	deleteInvitation(id);
	revalidatePath("/");
}

export async function deleteInvitedPersonAction(
	code: InvitedPersonValues["code"],
) {
	deleteInvitedPerson(code);
	revalidatePath("/");
}

export async function getInvitationAction(id: InvitationValues["id"]) {
	return getInvitation(id);
}

export async function rsvpAction(code: string, rsvp: boolean) {
	patchInvitation(code, { rsvp });
	// revalidateTag(initationKeys.code(code));
}

export async function exportCsvAction(data: unknown[]) {
	try {
		if (!data || data.length === 0)
			return { success: false, error: "No data found to export." };

		const csv = Papa.unparse(data);

		return { success: true, csvData: csv };
	} catch (error) {
		return {
			success: false,
			error: "Failed to generate CSV data. Please try again.",
		};
	}
}
