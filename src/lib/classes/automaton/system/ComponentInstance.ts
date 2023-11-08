import type { FromRaw } from "../AutomatonClass";
import type { RawComponentInstance } from "./raw/RawComponentInstance";
import { SystemMember } from "./SystemMember";
import type { SystemMemberId } from "./SystemMemberId";
import { Position } from "../Position";

const defaultX = 0;
const defaultY = 0;

/**
 * An instance of a Component
 * This is used by a System to store what components are used
 */
export class ComponentInstance extends SystemMember<RawComponentInstance> {
	constructor(
		/**
		 * The id of the component that this is an instance of
		 * This must be unique and is shared by Operators
		 */
		public id: SystemMemberId,

		/**
		 * The name of the component this references
		 */
		public name: string,

		/**
		 * The position of the component this references
		 */
		public position: Position = new Position(defaultX, defaultY),
	) {
		super();
	}

	/**
	 * Converts the ComponentInstance to a RawComponentInstance
	 */
	toRaw() {
		return {
			id: this.id.toRaw(),
			componentName: this.name,
			...this.position.toRaw(),
		};
	}

	/**
	 * Converts a RawComponentInstance to a ComponentInstance
	 */
	static readonly fromRaw: FromRaw<
		RawComponentInstance,
		{ id: SystemMemberId },
		ComponentInstance
	> = (raw, { id }) => {
		return new ComponentInstance(
			id,
			raw.componentName,
			Position.fromRaw({ x: raw.x ?? defaultX, y: raw.y ?? defaultY }),
		);
	};
}
