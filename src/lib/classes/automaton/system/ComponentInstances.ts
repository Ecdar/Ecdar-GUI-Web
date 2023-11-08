import { IdScopedMap } from "../IdScopedMap";
import type { RawNumberId } from "../raw/RawId";
import type { SystemMember } from "./SystemMember";
import type { SystemMemberId, SystemMemberIdInput } from "./SystemMemberId";
import type { RawComponentInstance } from "./raw/RawComponentInstance";
import type { RawComponentInstances } from "./raw/RawComponentInstances";
import { ComponentInstance } from "./ComponentInstance";
import type { IdMap } from "../IdMap";
import type { FromRaw } from "../AutomatonClass";

export class ComponentInstances extends IdScopedMap<
	SystemMember<RawComponentInstance>,
	ComponentInstance,
	SystemMemberId,
	SystemMemberIdInput,
	RawNumberId,
	RawComponentInstances
> {
	constructor(
		map: IdMap<
			SystemMember<any>,
			SystemMemberId,
			SystemMemberIdInput,
			RawNumberId,
			any
		>,
	) {
		super(map, ComponentInstance);
	}

	toRaw() {
		return [...this].map((componentInstance) => componentInstance.toRaw());
	}

	static readonly fromRaw: FromRaw<
		RawComponentInstances,
		{
			systemMembers: IdMap<
				SystemMember<any>,
				SystemMemberId,
				SystemMemberIdInput,
				RawNumberId,
				any
			>;
		},
		ComponentInstances
	> = (raw, { systemMembers }) => {
		const componentInstances = new ComponentInstances(systemMembers);
		for (const rawComponentInstance of raw) {
			const id = componentInstances.getNewIdFromRaw(
				rawComponentInstance.id,
			);

			if (!id)
				//TODO: Make this a user-friendly message with different options for recovering
				throw new TypeError(
					`Cannot load raw ComponentInstances where multiple id's are equivalent: ${rawComponentInstance.id}`,
				);

			componentInstances.add(
				ComponentInstance.fromRaw(rawComponentInstance, { id }),
			);
		}
		return componentInstances;
	};
}
