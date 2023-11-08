import { Location } from "./Location";
import type { LocationId, LocationIdInput } from "./LocationId";
import type { RawStringId } from "../raw/RawId";
import type { RawLocations } from "./raw/RawLocations";
import type { FromRaw } from "../AutomatonClass";
import { IdSubsetMap } from "../IdSubsetMap";
import type { Locations } from "../Locations";

export class LocationsSubset extends IdSubsetMap<
	Location,
	LocationId,
	LocationIdInput,
	RawStringId,
	RawLocations
> {
	toRaw() {
		return [...this].map((location) => location.toRaw());
	}

	static readonly fromRaw: FromRaw<
		RawLocations,
		{ locationsMap: Locations },
		LocationsSubset
	> = (raw, { locationsMap }) => {
		const locationsSubset = new LocationsSubset(locationsMap);
		for (const rawLocation of raw) {
			const id = locationsSubset.getNewIdFromRaw(rawLocation.id);

			if (!id)
				//TODO: Make this a user-friendly message with different options for recovering
				throw new TypeError(
					`Cannot load raw Locations where multiple id's are equivalent: ${rawLocation.id}`,
				);

			locationsSubset.add(Location.fromRaw(rawLocation, { id }));
		}
		return locationsSubset;
	};
}
