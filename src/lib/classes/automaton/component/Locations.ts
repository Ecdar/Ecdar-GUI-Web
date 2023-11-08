import { IdMap } from "../IdMap";
import { Location } from "./Location";
import { LocationId } from "./LocationId";
import type { RawStringId } from "../raw/RawId";
import type { RawLocations } from "./raw/RawLocations";
import type { FromRaw } from "../AutomatonClass";

export class Locations extends IdMap<
	Location,
	LocationId,
	RawStringId,
	RawLocations
> {
	constructor() {
		super(LocationId);
	}

	/**
	 * Converts the Locations to a RawLocations
	 */
	toRaw() {
		return [...this].map((location) => location.toRaw());
	}

	/**
	 * Converts a RawLocations to a Locations
	 */
	static readonly fromRaw: FromRaw<RawLocations, undefined, Locations> = (
		raw,
	) => {
		const locations = new Locations();
		for (const rawLocation of raw) {
			const id = locations.getNewIdFromRaw(rawLocation.id);

			if (!id)
				//TODO: Make this a user-friendly message with different options for recovering
				throw new TypeError(
					`Cannot load raw Locations where multiple id's are equivalent: ${rawLocation.id}`,
				);

			locations.add(Location.fromRaw(rawLocation, { id }));
		}
		return locations;
	};
}
