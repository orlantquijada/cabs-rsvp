import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "~/components/ui/select";
import type { InvitedPersonValues } from "~/db/schema";
import { rsvpAction } from "~/lib/actions";

type Props = { guest: Pick<InvitedPersonValues, "rsvp" | "id"> };

export default function RSVPColumn({ guest }: Props) {
	return (
		<Select
			defaultValue={`${guest.rsvp}`}
			onValueChange={(value) => {
				rsvpAction(guest.id, JSON.parse(value));
			}}
		>
			<SelectTrigger className="w-20">
				<SelectValue />
			</SelectTrigger>
			<SelectContent>
				<SelectGroup>
					<SelectItem value={`${null}`}>–</SelectItem>
					<SelectItem value={`${true}`}>Yes</SelectItem>
					<SelectItem value={`${false}`}>No</SelectItem>
				</SelectGroup>
			</SelectContent>
		</Select>
	);
}
