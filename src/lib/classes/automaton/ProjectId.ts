import type { FromRaw } from "./AutomatonClass";
import { Id } from "./Id";
import type { RawId, RawStringId } from "./raw/RawId";

export class ProjectId extends Id<RawId, RawStringId> {
	protected parse(input: string | number) {
		let rawId;
		let order;
		let orders;
		if (typeof input === "number") {
			rawId = `Project ${input}`;
			order = input;
		} else {
			rawId = input;
			const ordersMatches = [
				...input.matchAll(/((?<number>[\+\-]?\d+))/giu),
			];
			const ordersParsed = ordersMatches
				.filter((match) => match.groups?.number)
				.map((match) => parseInt(match.groups!.number))
				.filter((number) => !isNaN(number));
			if (ordersParsed.length === 1) {
				order = ordersParsed[0];
			} else if (ordersParsed.length > 1) {
				orders = [...ordersParsed];
			}
		}
		return { rawId, order, orders };
	}

	static readonly fromRaw: FromRaw<RawStringId, undefined, ProjectId> = (
		raw,
	) => {
		return new ProjectId(raw);
	};
}
