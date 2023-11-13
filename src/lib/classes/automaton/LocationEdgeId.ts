import type { RawStringId } from "./raw/RawId";
import { Id } from "./Id";
import type { RawLocationEdgeId } from "./raw/RawLocationEdgeId";
import type { FromRaw } from "./AutomatonClass";

export type LocationEdgeIdInput = number | RawLocationEdgeId;
export class LocationEdgeId extends Id<LocationEdgeIdInput, RawLocationEdgeId> {
	parse(this: void, id: LocationEdgeIdInput) {
		let rawId;
		let order;
		let orders;
		if (typeof id === "number") {
			rawId = `E${id}`;
			order = id;
		} else {
			rawId = id;
			const ordersMatches = [...id.matchAll(/E?(?<number>[+-]?\d+)/giu)]
				.map((match) => {
					if (typeof match.groups?.number !== "string") {
						return NaN;
					}
					return parseInt(match.groups.number);
				})
				.filter((number) => !isNaN(number));
			if (ordersMatches.length === 1) {
				order = ordersMatches[0];
			} else if (ordersMatches.length > 1) {
				orders = ordersMatches;
			}
		}
		return { rawId, order, orders };
	}

	protected applyParse(parsed: {
		rawId: RawLocationEdgeId;
		order: number | undefined;
		orders: number[] | undefined;
	}) {
		this._rawId = parsed.rawId;
		this._order = parsed.order;
		this._orders = parsed.orders;
	}

	static readonly fromRaw: FromRaw<RawStringId, undefined, LocationEdgeId> = (
		raw,
	) => {
		return new LocationEdgeId(raw);
	};
}
