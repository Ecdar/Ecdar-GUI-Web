import { IdMap } from "../IdMap";
import { System } from "./System";
import type { SystemId, SystemIdInput } from "./SystemId";
import type { RawStringId } from "../raw/RawId";
import type { RawSystems } from "./raw/RawSystems";
import { SystemIds } from "./SystemIds";
import type { FromRaw } from "../AutomatonClass";
import type { Components } from "../component/Components";

export class Systems extends IdMap<
	System,
	SystemId,
	SystemIdInput,
	RawStringId,
	RawSystems
> {
	constructor() {
		super(new SystemIds());
	}

	toRaw() {
		return this.size === 0
			? undefined
			: [...this].map((system) => system.toRaw());
	}

	static readonly fromRaw: FromRaw<
		RawSystems,
		{ componentIds: Components["ids"] },
		Systems
	> = (raw, { componentIds }) => {
		const systems = new Systems();
		if (raw) {
			for (const rawSystem of raw) {
				const id = systems.ids.getNewIdFromRaw(rawSystem.name);

				if (!id)
					//TODO: Make this a user-friendly message with different options for recovering
					throw new TypeError(
						`Cannot load raw Systems where multiple names are equivalent: ${rawSystem.name}`,
					);

				systems.add(System.fromRaw(rawSystem, { id, componentIds }));
			}
		}
		return systems;
	};
}
