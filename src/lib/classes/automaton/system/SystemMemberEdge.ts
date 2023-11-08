import { AutomatonClass, type FromRaw } from "../AutomatonClass";
import type { SystemMemberId } from "./SystemMemberId";
import type { RawComponentEdge } from "./raw/RawComponentEdge";

/**
 * Describes the edges of a system.
 */
export class SystemMemberEdge extends AutomatonClass<RawComponentEdge> {
	constructor(
		/**
		 * The beginning of the edge
		 */
		public parent: SystemMemberId,

		/**
		 * The end of the edge
		 */
		public child: SystemMemberId,
	) {
		super();
	}

	/**
	 * Converts the SystemEdge to a RawSystemEdge
	 */
	toRaw() {
		return {
			parent: this.parent.toRaw(),
			child: this.child.toRaw(),
		};
	}

	/**
	 * Converts a RawSystemEdge to a SystemEdge
	 */
	static readonly fromRaw: FromRaw<
		RawComponentEdge,
		{ parent: SystemMemberId; child: SystemMemberId },
		SystemMemberEdge
	> = (raw, { parent, child }) => {
		return new SystemMemberEdge(parent, child);
	};
}
