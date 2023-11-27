import { Location } from "../component/Location";
import type { LocationId, LocationIdInput } from "../LocationId";
import type { RawLocationId } from "../raw/RawLocationId";
import type { RawLocations } from "../component/raw/RawLocations";
import type { FromRaw } from "../AutomatonClass";
import type { LocationIds } from "../LocationIds";
import { IdMapScoped } from "../IdMapScoped";

export class Locations extends IdMapScoped<
	Location,
	LocationId,
	LocationIdInput,
	RawLocationId,
	RawLocations
> {
	constructor(
		/**
		 * The location ids to use in the map.
		 */
		readonly ids: LocationIds,
	) {
		super(ids);
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
	static readonly fromRaw: FromRaw<
		RawLocations,
		{ locationIds: LocationIds },
		Locations
	> = (raw, { locationIds }) => {
		const locations = new Locations(locationIds);
		if(raw){
			for (const rawLocation of raw) {
				const id = locations.ids.getNewIdFromRaw(rawLocation.id);

				if (!id)
					//TODO: Make this a user-friendly message with different options for recovering
					throw new TypeError(
						`Cannot load raw Locations where multiple id's are equivalent: ${rawLocation.id}`,
					);

				locations.add(Location.fromRaw(rawLocation, { id }));
			}
		}
		return locations;
	};
}
