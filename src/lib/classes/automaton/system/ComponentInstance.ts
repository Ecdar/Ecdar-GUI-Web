import { SystemMember } from "./SystemMember";
import type { RawComponentInstance } from "./raw/RawComponentInstance";
import type { SystemMemberId } from "./SystemMemberId";
import type { ComponentId } from "../component/ComponentId";
import { Position } from "../Position";
import type { Components } from "../component/Components";
import type { FromRaw } from "../AutomatonClass";

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
		 * The id of the component being shown
		 */
		public component: ComponentId,

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
			componentName: this.component.toRaw(),
			...this.position.toRaw(),
		};
	}

	/**
	 * Converts a RawComponentInstance to a ComponentInstance
	 */
	static readonly fromRaw: FromRaw<
		RawComponentInstance,
		{ id: SystemMemberId; componentIds: Components["ids"] },
		ComponentInstance
	> = (raw, { id, componentIds }) => {
		const component = componentIds.get(raw.componentName);
		if (!component) {
			//TODO: Make this a user-friendly message with different options for recovering
			throw new TypeError(
				`Cannot load a raw ComponentInstance that references a nonexistent component: ${raw.componentName}`,
			);
		}
		return new ComponentInstance(
			id,
			component,
			Position.fromRaw({ x: raw.x ?? defaultX, y: raw.y ?? defaultY }),
		);
	};
}
