import { IdStore } from "./IdStore";
import { LocationEdgeId, type LocationEdgeIdInput } from "./LocationEdgeId";
import type { RawLocationEdgeId } from "./raw/RawLocationEdgeId";

export class LocationEdgeIds extends IdStore<
	LocationEdgeId,
	LocationEdgeIdInput,
	RawLocationEdgeId
> {
	constructor() {
		super(LocationEdgeId);
	}
}
