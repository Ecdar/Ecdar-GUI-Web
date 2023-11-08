import type { FromRaw } from "../AutomatonClass";
import { IdMap } from "../IdMap";
import type { Locations } from "../Locations";
import type { RawStringId } from "../raw/RawId";
import { Component } from "./Component";
import { ComponentId } from "./ComponentId";
import type { RawComponents } from "./raw/RawComponents";

export class Components extends IdMap<
	Component,
	ComponentId,
	string,
	RawStringId,
	RawComponents
> {
	constructor() {
		super(ComponentId);
	}

	toRaw() {
		return [...this].map((component) => component.toRaw());
	}

	static readonly fromRaw: FromRaw<
		RawComponents,
		{ locations: Locations },
		Components
	> = (raw, { locations }) => {
		const components = new Components();
		for (const rawComponent of raw) {
			const id = components.getNewIdFromRaw(rawComponent.name);

			if (!id)
				//TODO: Make this a user-friendly message with different options for recovering
				throw new TypeError(
					`Cannot load raw Components where multiple names are equivalent: ${rawComponent.name}`,
				);

			components.add(Component.fromRaw(rawComponent, { id, locations }));
		}
		return components;
	};
}
