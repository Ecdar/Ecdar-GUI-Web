import type { FromRaw } from "../AutomatonClass";
import { IdMap } from "../IdMap";
import type { RawStringId } from "../raw/RawId";
import { System } from "./System";
import { SystemId } from "./SystemId";
import type { RawSystems } from "./raw/RawSystems";

export class Systems extends IdMap<
	System,
	SystemId,
	string,
	RawStringId,
	RawSystems
> {
	constructor() {
		super(SystemId);
	}

	toRaw() {
		return [...this].map((system) => system.toRaw());
	}

	static readonly fromRaw: FromRaw<RawSystems, undefined, Systems> = (
		raw,
	) => {
		const systems = new Systems();
		for (const rawSystem of raw) {
			const id = systems.getNewIdFromRaw(rawSystem.name);

			if (!id)
				//TODO: Make this a user-friendly message with different options for recovering
				throw new TypeError(
					`Cannot load raw Systems where multiple names are equivalent: ${rawSystem.name}`,
				);

			systems.add(System.fromRaw(rawSystem, { id }));
		}
		return systems;
	};
}
