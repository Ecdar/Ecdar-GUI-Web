import type { FromRaw } from "../AutomatonClass";
import { IdMap } from "../IdMap";
import type { RawNumberId } from "../raw/RawId";
import { ComponentInstance } from "./ComponentInstance";
import { Operator } from "./Operator";
import type { SystemMember } from "./SystemMember";
import { SystemMemberId, type SystemMemberIdInput } from "./SystemMemberId";
import type { RawComponentInstance } from "./raw/RawComponentInstance";
import type { RawOperator } from "./raw/RawOperator";
import type { RawSystemMembers } from "./raw/RawSystemMembers";

export class SystemMembers extends IdMap<
	SystemMember<RawComponentInstance | RawOperator>,
	SystemMemberId,
	SystemMemberIdInput,
	RawNumberId,
	RawSystemMembers
> {
	constructor() {
		super(SystemMemberId);
	}

	toRaw() {
		const raw: {
			componentInstances: RawComponentInstance[];
			operators: RawOperator[];
		} = {
			componentInstances: [],
			operators: [],
		};
		for (const member of this) {
			if (member instanceof ComponentInstance) {
				raw.componentInstances.push(member.toRaw());
			} else if (member instanceof Operator) {
				raw.operators.push(member.toRaw());
			}
		}
		return raw;
	}
}
