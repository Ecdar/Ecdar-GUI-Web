import { Id } from "./Id";
import type { RawIdFromString } from "./raw/RawId";
import type { FromRaw } from "../AutomatonClass";

export class LocationId extends Id<number, RawIdFromString> {
	constructor(id: number) {
		super(id);
	}

	toRaw() {
		return `L${this.id}`;
	}

	static readonly fromRaw: FromRaw<RawIdFromString, undefined, LocationId> = (
		raw,
	) => {};
}
