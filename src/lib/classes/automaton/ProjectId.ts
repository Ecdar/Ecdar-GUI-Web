import type { RawProjectId } from "./raw/RawProjectId";
import { Id } from "./Id";

export type ProjectIdInput = number | RawProjectId;

export class ProjectId extends Id<ProjectIdInput, RawProjectId> {
	parse(this: void, input: string | number) {
		let rawId;
		let order;
		let orders;
		if (typeof input === "number") {
			rawId = `Project ${input}`;
			order = input;
		} else {
			rawId = input;
			const ordersMatches = [
				// Extracts a number following "Project " in the input string.
				...input.matchAll(/Project (?<number>[+-]?\d+)/giu),
			];
			const ordersParsed = ordersMatches
				.map((match) => {
					if (typeof match.groups?.number !== "string") {
						return NaN;
					}
					return parseInt(match.groups.number);
				})
				.filter((number) => !isNaN(number));
			if (ordersParsed.length === 1) {
				order = ordersParsed[0];
			} else if (ordersParsed.length > 1) {
				orders = [...ordersParsed];
			}
		}
		return { rawId, order, orders };
	}

	protected applyParse(parsed: {
		rawId: RawProjectId;
		order: number | undefined;
		orders: number[] | undefined;
	}) {
		this._rawId = parsed.rawId;
		this._order = parsed.order;
		this._orders = parsed.orders;
	}
}
