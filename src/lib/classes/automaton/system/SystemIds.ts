import { IdStore } from "../IdStore";
import { SystemId, type SystemIdInput } from "./SystemId";
import type { RawSystemId } from "./raw/RawSystemId";

export class SystemIds extends IdStore<SystemId, SystemIdInput, RawSystemId> {
	constructor() {
		super(SystemId);
	}
}
