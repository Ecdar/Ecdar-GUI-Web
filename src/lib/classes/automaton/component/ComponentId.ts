import { Id } from "../Id";
import type { RawComponentId } from "./raw/RawComponentId";

export type ComponentIdInput = number | RawComponentId;

export class ComponentId extends Id<ComponentIdInput, RawComponentId> {
	parse(this: void, input: ComponentIdInput) {
		let rawId;
		let order;
		let orders;
		if (typeof input === "number") {
			rawId = `Component ${input}`;
			order = input;
		} else {
			rawId = input;
			const ordersMatches = [
				...input.matchAll(/((?<number>[+-]?\d+))/giu),
			];
			const ordersParsed = ordersMatches
				.map((match) => {
					if (typeof match.groups?.numer !== "string") {
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
		rawId: RawComponentId;
		order: number | undefined;
		orders: number[] | undefined;
	}) {
		this._rawId = parsed.rawId;
		this._order = parsed.order;
		this._orders = parsed.orders;

		if (this._orders === undefined) {
			this._higherOrder = undefined;
		} else {
			this._higherOrder = [
				this._orders.length,
				this._orders.reduce((total, next) => total + next, 0),
			];
		}
	}
}
