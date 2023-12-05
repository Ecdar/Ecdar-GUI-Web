import { IdStore } from "../IdStore";
import { ComponentId, type ComponentIdInput } from "./ComponentId";
import type { RawComponentId } from "./raw/RawComponentId";

export class ComponentIds extends IdStore<
	ComponentId,
	ComponentIdInput,
	RawComponentId
> {
	constructor() {
		super(ComponentId);
	}
}
