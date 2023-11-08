import { Id } from "../Id";
import type { RawNumberId } from "../raw/RawId";

export type SystemMemberIdInput = number | RawNumberId;

export class SystemMemberId extends Id<SystemMemberIdInput, RawNumberId> {
	parse(id: SystemMemberIdInput) {
		return { rawId: id, order: id, orders: undefined };
	}
}
