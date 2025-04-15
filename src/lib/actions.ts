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
	bulkRSVP,
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
			guests: v.array(v.object({ name: v.string() })),
		});
		const parsedData = v.parse(transformDataSchema, {
			...validatedData,
			guests: JSON.parse(validatedData.people as unknown as string),
		});
		createFullInvitation({
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
}

export async function deleteInvitationAction(code: InvitationValues["code"]) {
	deleteInvitation(code);
	revalidatePath("/");
}

export async function deleteInvitedPersonAction(id: InvitedPersonValues["id"]) {
	deleteInvitedPerson(id);
	revalidatePath("/");
}

export async function getInvitationAction(code: InvitationValues["code"]) {
	return getInvitation(code);
}

export async function rsvpAction(id: InvitedPersonValues["id"], rsvp: boolean) {
	patchInvitation(id, { rsvp });
	revalidatePath("/");
	// revalidateTag(initationKeys.code(code));
}

export async function bulkRsvpAction(
	people: Pick<InvitedPersonValues, "id" | "rsvp">[],
) {
	bulkRSVP(people);
	revalidatePath("/");
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
