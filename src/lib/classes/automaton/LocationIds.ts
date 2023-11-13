import { IdStore } from "./IdStore";
import { LocationId, type LocationIdInput } from "./LocationId";
import type { RawLocationId } from "./raw/RawLocationId";
import { LocationType } from "../automaton";

export class LocationIds extends IdStore<
	LocationId,
	LocationIdInput,
	RawLocationId
> {
	constructor() {
		super(LocationId);
	}

	getNewOrderedId(type: LocationType = LocationType.NORMAL) {
		super.findNextOrderedIndex();
		const newId = new super.idConstructor({
			type,
			order: this.nextOrderedIndex,
		});
		super.add(newId);

		return newId;
	}
}
