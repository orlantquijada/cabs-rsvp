import * as v from "valibot";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "~/components/ui/accordion";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { bulkRsvpAction } from "~/lib/actions";
import { useAppForm } from "~/utils/form";
import { Label } from "./ui/label";

type Props = {
	invitedPeople: {
		name: string;
		id: number;
		rsvp: boolean | null;
		invitationCode: string;
	}[];
};

export default function RSVPForm({ invitedPeople }: Props) {
	const form = useAppForm({
		defaultValues: {
			people: invitedPeople.map((person) => ({
				id: person.id,
				name: person.name,
				rsvp: person.rsvp,
			})),
		},
		validators: {
			onSubmit: v.object({
				people: v.array(
					v.object({ id: v.number(), rsvp: v.boolean(), name: v.string() }),
				),
			}),
		},
		onSubmit: ({ value }) => {
			bulkRsvpAction(value.people);
		},
	});

	return (
		<div className="text-brand">
			<form.AppField
				name="people"
				mode="array"
				// biome-ignore lint/correctness/noChildrenProp: <explanation>
				children={(field) => (
					<Accordion
						type="multiple"
						className="w-full"
						defaultValue={invitedPeople.map(({ id }) => id.toString())}
					>
						{field.state.value.map((person, idx) => (
							<form.Field
								// biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
								key={idx}
								name={`people[${idx}].rsvp`}
								// biome-ignore lint/correctness/noChildrenProp: <explanation>
								children={(subField) => (
									<AccordionItem value={`${person.id}`} key={person.id}>
										<AccordionTrigger>{person.name}</AccordionTrigger>
										<AccordionContent>
											<RadioGroup
												onValueChange={(value) => {
													subField.handleChange(JSON.parse(value));
												}}
												key={person.id}
												className="space-y-2"
											>
												<div className="flex items-center space-x-2">
													<RadioGroupItem
														value={`${true}`}
														id={`attending-${person.id}`}
													/>
													<Label
														htmlFor={`attending-${person.id}`}
														className="font-medium"
													>
														Yes, I'll be there
													</Label>
												</div>
												<div className="flex items-center space-x-2">
													<RadioGroupItem
														value={`${false}`}
														id={`declined-${person.id}`}
													/>
													<Label
														htmlFor={`declined-${person.id}`}
														className="font-medium"
													>
														No, I can't make it
													</Label>
												</div>
											</RadioGroup>
										</AccordionContent>
									</AccordionItem>
								)}
							/>
						))}
					</Accordion>
				)}
			/>

			{!!form.state.errors.length && (
				<small className="text-sm font-medium leading-none text-destructive block mt-4">
					Missing Responses
				</small>
			)}

			<button
				className="mt-8 h-10 px-4 bg-brand text-on-brand text-base font-sans border border-transparent grid place-items-center"
				type="button"
				style={{ borderRadius: 8 }}
				onClick={() => {
					form.handleSubmit();
				}}
			>
				Submit RSVP
			</button>
		</div>
	);
}
