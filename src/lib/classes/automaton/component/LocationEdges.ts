import { IdMap } from "../IdMap";
import { LocationEdgeId } from "./LocationEdgeId";
import type { RawStringId } from "../raw/RawId";
import type { RawLocationEdges } from "./raw/RawLocationEdges";
import type { FromRaw } from "../AutomatonClass";
import type { LocationsSubset } from "./LocationsSubset";
import { LocationEdge } from "./LocationEdge";

export class LocationEdges extends IdMap<
	LocationEdge,
	LocationEdgeId,
	RawStringId,
	RawStringId,
	RawLocationEdges
> {
	constructor() {
		super(LocationEdgeId);
	}

	/**
	 * Converts the LocationEdges to a RawLocationEdges
	 */
	toRaw() {
		return [...this].map((edge) => edge.toRaw());
	}

	/**
	 * Converts a RawLocationEdges to a LocationEdges
	 */
	static readonly fromRaw: FromRaw<
		RawLocationEdges,
		{ locations: LocationsSubset },
		LocationEdges
	> = (raw, { locations }) => {
		const locationEdges = new LocationEdges();
		for (const rawLocationEdge of raw) {
			const id = locationEdges.getNewIdFromRaw(rawLocationEdge.id);

			if (!id)
				//TODO: Make this a user-friendly message with different options for recovering
				throw new TypeError(
					`Cannot load raw LocationEdges where multiple id's are equivalent: ${rawLocationEdge.id}`,
				);

			const source = locations.getId(rawLocationEdge.sourceLocation);
			if (!source || !locations.has(rawLocationEdge.sourceLocation))
				//TODO: Make this a user-friendly message with different options for recovering
				throw new TypeError(
					`Cannot load raw LocationEdge ${rawLocationEdge.id} because its source Location doesn't exist: ${rawLocationEdge.sourceLocation}`,
				);

			const target = locations.getId(rawLocationEdge.targetLocation);
			if (!target || !locations.has(rawLocationEdge.targetLocation))
				//TODO: Make this a user-friendly message with different options for recovering
				throw new TypeError(
					`Cannot load raw LocationEdge ${rawLocationEdge.id} because its target Location doesn't exist: ${rawLocationEdge.targetLocation}`,
				);

			locationEdges.add(
				LocationEdge.fromRaw(rawLocationEdge, { id, source, target }),
			);
		}
		return locationEdges;
	};
}
