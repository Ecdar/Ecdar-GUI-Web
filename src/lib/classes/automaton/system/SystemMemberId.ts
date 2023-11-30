import { Id } from "../Id";
import type { RawSystemMemberId } from "./raw/RawSystemMemberId";

export type SystemMemberIdInput = number;

export class SystemMemberId extends Id<SystemMemberIdInput, RawSystemMemberId> {
	parse(this: void, id: SystemMemberIdInput) {
		if (id === 0) {
			throw new TypeError(
				"Cannot instantiate a system member with id 0, as it is reserved for the system origin",
			);
		}
		return { rawId: id, order: id, orders: undefined };
	}

	protected applyParse(parsed: { rawId: RawSystemMemberId; order: number }) {
		this._rawId = parsed.rawId;
		this._order = parsed.order;
	}
}
