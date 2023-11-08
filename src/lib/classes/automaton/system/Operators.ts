import { IdScopedMap } from "../IdScopedMap";
import type { RawNumberId } from "../raw/RawId";
import type { SystemMember } from "./SystemMember";
import type { SystemMemberId, SystemMemberIdInput } from "./SystemMemberId";
import type { RawOperator } from "./raw/RawOperator";
import type { RawOperators } from "./raw/RawOperators";
import { Operator } from "./Operator";
import type { IdMap } from "../IdMap";
import type { FromRaw } from "../AutomatonClass";

export class Operators extends IdScopedMap<
	SystemMember<RawOperator>,
	Operator,
	SystemMemberId,
	SystemMemberIdInput,
	RawNumberId,
	RawOperators
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
		super(map, Operator);
	}

	toRaw() {
		return [...this].map((operator) => operator.toRaw());
	}

	static readonly fromRaw: FromRaw<
		RawOperators,
		{
			systemMembers: IdMap<
				SystemMember<any>,
				SystemMemberId,
				SystemMemberIdInput,
				RawNumberId,
				any
			>;
		},
		Operators
	> = (raw, { systemMembers }) => {
		const operators = new Operators(systemMembers);
		for (const rawOperator of raw) {
			const id = operators.getNewIdFromRaw(rawOperator.id);

			if (!id)
				//TODO: Make this a user-friendly message with different options for recovering
				throw new TypeError(
					`Cannot load raw Operators where multiple id's are equivalent: ${rawOperator.id}`,
				);

			operators.add(Operator.fromRaw(rawOperator, { id }));
		}
		return operators;
	};
}
