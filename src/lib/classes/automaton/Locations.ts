import { IdMap, type IIdMapValues } from "./IdMap";
import { Location } from "./component/Location";
import { LocationId, type LocationIdInput } from "./component/LocationId";
import type { RawStringId } from "./raw/RawId";
import type { RawLocations } from "./component/raw/RawLocations";
import { AutomatonClass, type FromRaw } from "./AutomatonClass";
import { LocationType } from "./component/LocationType";

class PartialLocations extends IdMap<
	Location,
	LocationId,
	LocationIdInput,
	RawStringId,
	RawLocations
> {
	constructor() {
		super(LocationId);
	}

	/**
	 * Converts the PartialLocations to a RawLocations
	 * WARNING: This is not all locations, only all locations of a specific type.
	 */
	toRaw() {
		return [...this].map((location) => location.toRaw());
	}
}

type PartialLocationsMap = {
	[key in keyof typeof LocationType]: PartialLocations;
};

export class Locations
	extends AutomatonClass<RawLocations>
	implements IIdMapValues<Location, LocationId, LocationIdInput, RawStringId>
{
	private partialLocationsMap: PartialLocationsMap = {
		[LocationType.NORMAL]: new PartialLocations(),
		[LocationType.UNIVERSAL]: new PartialLocations(),
		[LocationType.INCONSISTENT]: new PartialLocations(),
	};

	getNewIdFromRaw(rawId: RawStringId) {
		// We only use this ID to get the type, it should NOT be added to the store
		const tempId = new LocationId(rawId);

		const partialLocations = this.partialLocationsMap[tempId.type];
		return partialLocations.getNewIdFromRaw(rawId);
	}

	getNewOrderedId(type: LocationType) {
		const partialLocations = this.partialLocationsMap[type];
		return partialLocations.getNewOrderedId();
	}

	hasId(id: LocationId | RawStringId): boolean {
		let type: LocationType;
		if (id instanceof LocationId) {
			type = id.type;
		} else {
			// We only use this ID to get the type, it should NOT be added to the store
			const tempId = new LocationId(id);
			type = tempId.type;
		}

		const partialLocations = this.partialLocationsMap[type];
		return partialLocations.hasId(id);
	}

	getId(rawId: RawStringId): LocationId | undefined {
		// We only use this ID to get the type, it should NOT be added to the store
		const tempId = new LocationId(rawId);

		const partialLocations = this.partialLocationsMap[tempId.type];
		return partialLocations.getId(rawId);
	}

	get size() {
		return [...Object.values(this.partialLocationsMap)].reduce(
			(total, next) => total + next.size,
			0,
		);
	}

	has(input: Location | LocationId | RawStringId) {
		if (input instanceof Location) {
			const partialLocations = this.partialLocationsMap[input.type];
			return partialLocations.has(input);
		} else {
			for (const partialLocations of Object.values(
				this.partialLocationsMap,
			)) {
				if (partialLocations.has(input)) return true;
			}
			return false;
		}
	}

	get(id: LocationId) {
		const partialLocations = this.partialLocationsMap[id.type];
		return partialLocations.get(id);
	}

	add(member: Location) {
		const partialLocations = this.partialLocationsMap[member.id.type];
		return partialLocations.add(member);
	}

	update(member: Location) {
		const partialLocations = this.partialLocationsMap[member.id.type];
		return partialLocations.update(member);
	}

	delete(member: Location) {
		const partialLocations = this.partialLocationsMap[member.id.type];
		return partialLocations.delete(member);
	}

	*[Symbol.iterator]() {
		for (const partialLocations of Object.values(
			this.partialLocationsMap,
		)) {
			yield* partialLocations;
		}
	}

	values = this[Symbol.iterator];

	*keys() {
		for (const partialLocations of Object.values(
			this.partialLocationsMap,
		)) {
			yield* partialLocations.keys();
		}
	}

	*entries() {
		for (const partialLocations of Object.values(
			this.partialLocationsMap,
		)) {
			yield* partialLocations.entries();
		}
	}

	/**
	 * Converts the Locations to a RawLocations
	 */
	toRaw() {
		return [...Object.values(this.partialLocationsMap)]
			.map((partialLocations) => partialLocations.toRaw())
			.flat();
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
