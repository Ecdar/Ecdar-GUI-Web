import { Id } from "./Id";
import type { RawId, RawStringId } from "./raw/RawId";
import { LocationType } from "./component/LocationType";
import type { FromRaw } from "./AutomatonClass";
import type { RawLocationId } from "./raw/RawLocationId";

export type LocationIdInput = RawId | { type: LocationType; order: number };

export class LocationId extends Id<LocationIdInput, RawLocationId> {
	constructor(id: LocationIdInput | RawLocationId) {
		super(id);
		this.applyParse(this.parse(id));
	}

	/**
	 * The logical type of location.
	 * This should not be part of the ID, but we can't change the data structure, so here we are.
	 */
	get type() {
		return this._type;
	}
	_type: LocationType = LocationType.NORMAL;

	parse(this: void, input: LocationIdInput) {
		let rawId;
		let order;
		let orders;
		let type = LocationType.NORMAL;
		if (typeof input === "object") {
			let precursor: string;
			switch (input.type) {
				case LocationType.NORMAL: {
					precursor = "L";
					break;
				}
				case LocationType.UNIVERSAL: {
					precursor = "U";
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
				// Extracts a number following a variation of "L", "UL", "IL" in the input string.
				...input.matchAll(
					/(?<isUniversal>U)?(?<isInconsistent>I)?L?(?<number>[+-]?\d+)/giu,
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
						type = LocationType.UNIVERSAL;
					}
					if (orderMatch.groups.isInconsistent) {
						type = LocationType.INCONSISTENT;
					}
				}
			}
			if (ordersParsed.length === 1) {
				order = ordersParsed[0].number;
			} else if (ordersParsed.length > 1) {
				orders = ordersParsed.map((parsed) => parsed.number);
			}
		}

		return { rawId, order, orders, type };
	}

	protected applyParse(parsed: {
		rawId: RawLocationId;
		order: number | undefined;
		orders: number[] | undefined;
		type: LocationType;
	}) {
		this._rawId = parsed.rawId;
		this._order = parsed.order;
		this._orders = parsed.orders;
		this._type = parsed.type;
	}

	static readonly fromRaw: FromRaw<RawStringId, undefined, LocationId> = (
		raw,
	) => {
		return new LocationId(raw);
	};
}
