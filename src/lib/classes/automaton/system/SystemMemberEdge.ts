import { AutomatonClass, type FromRaw } from "../AutomatonClass";
import type { SystemMemberId } from "./SystemMemberId";
import type { RawSystemMemberEdge } from "./raw/RawSystemMemberEdge";

/**
 * References the origin of the parent system.
 */
export const systemOrigin = Symbol("system origin");

/**
 * Describes the edges of a system.
 */
export class SystemMemberEdge extends AutomatonClass<RawSystemMemberEdge> {
	constructor(
		/**
		 * The beginning of the edge
		 */
		public parent: SystemMemberId | typeof systemOrigin,

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
			parent: this.parent === systemOrigin ? 0 : this.parent.toRaw(),
			child: this.child.toRaw(),
		};
	}

	/**
	 * Converts a RawSystemEdge to a SystemEdge
	 */
	static readonly fromRaw: FromRaw<
		RawSystemMemberEdge,
		{ parent: SystemMemberId | typeof systemOrigin; child: SystemMemberId },
		SystemMemberEdge
	> = (raw, { parent, child }) => {
		return new SystemMemberEdge(parent, child);
	};
}
