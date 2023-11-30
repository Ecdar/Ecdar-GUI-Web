import type { FromRaw } from "../AutomatonClass";
import { IdMap } from "../IdMap";
import type { LocationEdgeIds } from "../LocationEdgeIds";
import type { LocationIds } from "../LocationIds";
import type { RawStringId } from "../raw/RawId";
import { Component } from "./Component";
import type { ComponentId, ComponentIdInput } from "./ComponentId";
import { ComponentIds } from "./ComponentIds";
import type { RawComponents } from "./raw/RawComponents";

export class Components extends IdMap<
	Component,
	ComponentId,
	ComponentIdInput,
	RawStringId,
	RawComponents
> {
	constructor() {
		super(new ComponentIds());
	}

	toRaw() {
		return this.size === 0
			? undefined
			: [...this].map((component) => component.toRaw());
	}

	static readonly fromRaw: FromRaw<
		RawComponents,
		{ locationIds: LocationIds; locationEdgeIds: LocationEdgeIds },
		Components
	> = (raw, { locationIds, locationEdgeIds }) => {
		const components = new Components();
		if (raw) {
			for (const rawComponent of raw) {
				const id = components.ids.getNewIdFromRaw(rawComponent.name);

				if (!id)
					//TODO: Make this a user-friendly message with different options for recovering
					throw new TypeError(
						`Cannot load raw Components where multiple names are equivalent: ${rawComponent.name}`,
					);

				components.add(
					Component.fromRaw(rawComponent, {
						id,
						locationIds,
						locationEdgeIds,
					}),
				);
			}
		}
		return components;
	};
}
