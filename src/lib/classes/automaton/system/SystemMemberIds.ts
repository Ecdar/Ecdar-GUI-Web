import { IdStore } from "../IdStore";
import { SystemMemberId, type SystemMemberIdInput } from "./SystemMemberId";
import type { RawNumberId } from "../raw/RawId";

export class SystemMemberIds extends IdStore<
	SystemMemberId,
	SystemMemberIdInput,
	RawNumberId
> {
	constructor() {
		super(SystemMemberId);
	}
}
