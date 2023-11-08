import { Id } from "../Id";
import type { RawId, RawStringId } from "../raw/RawId";
import { LocationType } from "./LocationType";
import type { FromRaw } from "../AutomatonClass";

export type LocationIdInput = RawId | { type: LocationType; order: number };
export class LocationId extends Id<LocationIdInput, RawStringId> {
	#type: LocationType = LocationType.NORMAL;
	get type() {
		return this.#type;
	}

	protected parse(input: LocationIdInput) {
		let rawId;
		let order;
		let orders;
		if (typeof input === "object") {
			let precursor = "L";
			switch (input.type) {
				case LocationType.UNIVERSAL: {
					precursor = "UL";
					break;
				}
				case LocationType.INCONSISTENT: {
					precursor = "IL";
					break;
				}
			}
			rawId = `${precursor}${input.order}`;
			order = input.order;
		} else if (typeof input === "number") {
			rawId = `L${input}`;
			order = input;
		} else {
			rawId = input;
			const ordersMatches = [
				...input.matchAll(
					/(?<isUniversal>U)?(?<isInconsistent>I)?(?<isLocation>L)?(?<number>[\+\-]?\d+)/giu,
				),
			];
			const ordersParsed: {
				isUniversal: boolean;
				isInconsistent: boolean;
				isLocation: boolean;
				number: number;
			}[] = [];
			for (const orderMatch of ordersMatches) {
				if (orderMatch.groups) {
					const parsed = {
						isUniversal: Boolean(orderMatch.groups.isUniversal),
						isInconsistent: Boolean(
							orderMatch.groups.isInconsistent,
						),
						isLocation: Boolean(orderMatch.groups.isLocation),
						number: parseInt(orderMatch.groups.number || "0"),
					};
					ordersParsed.push(parsed);

					/**
					 * TODO: This check is pretty naive.
					 * We should check that the Id is only universal, inconsistent, or normal.
					 * If it is more than one, we should throw an error.
					 * This would require testing to make sure it is compatible with some of the more crazy Id's that Ecdar generates.
					 */
					if (orderMatch.groups.isUniversal) {
						this.#type = LocationType.UNIVERSAL;
					}
					if (orderMatch.groups.isInconsistent) {
						this.#type = LocationType.INCONSISTENT;
					}
				}
			}
			if (ordersParsed.length === 1) {
				order = ordersParsed[0].number;
			} else if (ordersParsed.length > 1) {
				orders = ordersParsed.map((parsed) => parsed.number);
			}
		}
		return { rawId, order, orders };
	}

	static readonly fromRaw: FromRaw<RawStringId, undefined, LocationId> = (
		raw,
	) => {
		return new LocationId(raw);
	};
}
