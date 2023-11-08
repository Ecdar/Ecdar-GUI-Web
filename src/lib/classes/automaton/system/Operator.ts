import type { FromRaw } from "../AutomatonClass";
import type { RawOperator } from "./raw/RawOperator";
import { OperatorType } from "./OperatorType";
import { Position } from "../Position";
import type { SystemMemberId } from "./SystemMemberId";
import { SystemMember } from "./SystemMember";

/**
 * Defines an operator for a System
 */
export class Operator extends SystemMember<RawOperator> {
	constructor(
		/**
		 * The id of the operator
		 * must be unique and matches the id of a ComponentInstance
		 */
		public id: SystemMemberId,

		/**
		 * The type of operator
		 */
		public type: OperatorType = OperatorType.COMPOSITION,

		/**
		 * The position of the operator
		 */
		readonly position: Position = new Position(0, 0),
	) {
		super();
	}

	/**
	 * Converts the Operator to a RawOperator
	 */
	toRaw() {
		return {
			id: this.id.toRaw(),
			type: this.type,
			...this.position.toRaw(),
		};
	}

	/**
	 * Converts a RawOperator to an Operator
	 */
	static readonly fromRaw: FromRaw<
		RawOperator,
		{ id: SystemMemberId },
		Operator
	> = (raw, { id }) => {
		return new Operator(id, raw.type, Position.fromRaw(raw));
	};
}
