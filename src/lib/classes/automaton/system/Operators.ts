import { IdMapScoped } from "../IdMapScoped";
import { Operator } from "./Operator";
import type { SystemMemberId, SystemMemberIdInput } from "./SystemMemberId";
import type { RawSystemMemberId } from "./raw/RawSystemMemberId";
import type { RawOperators } from "./raw/RawOperators";
import type { FromRaw } from "../AutomatonClass";
import type { SystemMemberIds } from "./SystemMemberIds";

export class Operators extends IdMapScoped<
	Operator,
	SystemMemberId,
	SystemMemberIdInput,
	RawSystemMemberId,
	RawOperators
> {
	toRaw() {
		return this.size === 0
			? undefined
			: [...this].map((operator) => operator.toRaw());
	}

	static readonly fromRaw: FromRaw<
		RawOperators,
		{
			systemMemberIds: SystemMemberIds;
		},
		Operators
	> = (raw, { systemMemberIds }) => {
		const operators = new Operators(systemMemberIds);
		if (raw) {
			for (const rawOperator of raw) {
				const id = operators.ids.getNewIdFromRaw(rawOperator.id);

				if (!id)
					//TODO: Make this a user-friendly message with different options for recovering
					throw new TypeError(
						`Cannot load raw Operators where multiple id's are equivalent: ${rawOperator.id}`,
					);

				operators.add(Operator.fromRaw(rawOperator, { id }));
			}
		}
		return operators;
	};
}
