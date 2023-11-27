import { Id } from "../Id";
import type { RawSystemId } from "./raw/RawSystemId";

export type SystemIdInput = number | RawSystemId;

export class SystemId extends Id<SystemIdInput, RawSystemId> {
	parse(this: void, input: string | number) {
		let rawId;
		let order;
		let orders;
		if (typeof input === "number") {
			rawId = `System ${input}`;
			order = input;
		} else {
			rawId = input;
			const ordersMatches = [
				...input.matchAll(/System (?<number>[+-]?\d+)/giu),
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
		rawId: RawSystemId;
		order: number | undefined;
		orders: number[] | undefined;
	}) {
		this._rawId = parsed.rawId;
		this._order = parsed.order;
		this._orders = parsed.orders;
	}
}
