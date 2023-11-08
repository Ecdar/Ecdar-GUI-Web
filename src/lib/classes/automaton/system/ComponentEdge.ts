import { AutomatonClass, type FromRaw } from "../AutomatonClass";
import type { RawComponentEdge } from "./raw/RawComponentEdge";

/**
 * Describes the edges of a system.
 */
export class ComponentEdge extends AutomatonClass<RawComponentEdge> {
	constructor(
		/**
		 * The beginning of the edge
		 */
		public parent: number,

		/**
		 * The end of the edge
		 */
		public child: number,
	) {
		super();
	}

	/**
	 * Converts the SystemEdge to a RawSystemEdge
	 */
	toRaw() {
		return {
			parent: this.parent,
			child: this.child,
		};
	}

	/**
	 * Converts a RawSystemEdge to a SystemEdge
	 */
	static readonly fromRaw: FromRaw<
		RawComponentEdge,
		undefined,
		ComponentEdge
	> = (raw) => {
		return new ComponentEdge(raw.parent, raw.child);
	};
}
