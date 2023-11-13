import { IdMapScoped } from "../IdMapScoped";
import { ComponentInstance } from "./ComponentInstance";
import type { SystemMemberId, SystemMemberIdInput } from "./SystemMemberId";
import type { RawNumberId } from "../raw/RawId";
import type { RawComponentInstances } from "./raw/RawComponentInstances";
import type { FromRaw } from "../AutomatonClass";
import type { SystemMemberIds } from "./SystemMemberIds";
import type { Components } from "../component/Components";

export class ComponentInstances extends IdMapScoped<
	ComponentInstance,
	SystemMemberId,
	SystemMemberIdInput,
	RawNumberId,
	RawComponentInstances
> {
	toRaw() {
		return [...this].map((componentInstance) => componentInstance.toRaw());
	}

	static readonly fromRaw: FromRaw<
		RawComponentInstances,
		{
			systemMemberIds: SystemMemberIds;
			componentIds: Components["ids"];
		},
		ComponentInstances
	> = (raw, { systemMemberIds, componentIds }) => {
		const componentInstances = new ComponentInstances(systemMemberIds);
		for (const rawComponentInstance of raw) {
			const id = componentInstances.ids.getNewIdFromRaw(
				rawComponentInstance.id,
			);

			if (!id)
				//TODO: Make this a user-friendly message with different options for recovering
				throw new TypeError(
					`Cannot load raw ComponentInstances where multiple id's are equivalent: ${rawComponentInstance.id}`,
				);

			componentInstances.add(
				ComponentInstance.fromRaw(rawComponentInstance, {
					id,
					componentIds,
				}),
			);
		}
		return componentInstances;
	};
}
