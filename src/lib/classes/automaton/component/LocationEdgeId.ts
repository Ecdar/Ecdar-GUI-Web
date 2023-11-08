import { Id } from "../Id";
import type { RawStringId } from "../raw/RawId";
import type { FromRaw } from "../AutomatonClass";

type LocationEdgeIdInput = RawStringId | number;
export class LocationEdgeId extends Id<LocationEdgeIdInput, RawStringId> {
	protected parse(id: LocationEdgeIdInput) {
		let rawId;
		let order;
		let orders;
		if (typeof id === "number") {
			rawId = `E${id}`;
			order = id;
		} else {
			rawId = id;
			const ordersMatches = [
				...id.matchAll(/(?<isEdge>E)?(?<number>[\+\-]?\d+)/giu),
			].map((match) => parseInt(match.groups?.number || "0"));
			if (ordersMatches.length === 1) {
				order = ordersMatches[0];
			} else if (ordersMatches.length > 1) {
				orders = ordersMatches;
			}
		}
		return { rawId, order, orders };
	}

	static readonly fromRaw: FromRaw<RawStringId, undefined, LocationEdgeId> = (
		raw,
	) => {
		return new LocationEdgeId(raw);
	};
}
