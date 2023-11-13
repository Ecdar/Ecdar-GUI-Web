import { IdMap } from "../IdMap";
import { LocationEdge } from "./LocationEdge";
import type { LocationEdgeId, LocationEdgeIdInput } from "../LocationEdgeId";
import type { RawLocationEdgeId } from "../raw/RawLocationEdgeId";
import type { RawLocationEdges } from "./raw/RawLocationEdges";
import type { FromRaw } from "../AutomatonClass";
import type { IIdStore } from "../IdStore";
import type { LocationIds } from "../LocationIds";

export class LocationEdges extends IdMap<
	LocationEdge,
	LocationEdgeId,
	LocationEdgeIdInput,
	RawLocationEdgeId,
	RawLocationEdges
> {
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
		{
			locationEdgeIds: IIdStore<
				LocationEdgeId,
				LocationEdgeIdInput,
				RawLocationEdgeId
			>;
			locationIds: LocationIds;
		},
		LocationEdges
	> = (raw, { locationEdgeIds, locationIds }) => {
		const locationEdges = new LocationEdges(locationEdgeIds);
		for (const rawLocationEdge of raw) {
			const id = locationEdges.ids.getNewIdFromRaw(rawLocationEdge.id);

			if (!id)
				//TODO: Make this a user-friendly message with different options for recovering
				throw new TypeError(
					`Cannot load raw LocationEdges where multiple id's are equivalent: ${rawLocationEdge.id}`,
				);

			const source = locationIds.get(rawLocationEdge.sourceLocation);
			if (!source)
				//TODO: Make this a user-friendly message with different options for recovering
				throw new TypeError(
					`Cannot load raw LocationEdge ${rawLocationEdge.id} because its source Location doesn't exist: ${rawLocationEdge.sourceLocation}`,
				);

			const target = locationIds.get(rawLocationEdge.targetLocation);
			if (!target)
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
