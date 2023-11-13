import { AutomatonClass, type FromRaw } from "../AutomatonClass";
import type { RawSystem } from "./raw/RawSystem";
import type { HasId } from "../HasId";
import type { SystemId } from "./SystemId";
import { Position } from "../Position";
import { Dimensions } from "../Dimensions";
import { SystemMemberEdge, origin } from "./SystemMemberEdge";
import { SystemMemberIds } from "./SystemMemberIds";
import { ComponentInstances } from "./ComponentInstances";
import { Operators } from "./Operators";
import type { Components } from "../component/Components";

const defaultX = 0;
const defaultY = 0;

const defaultWidth = 100;
const defaultHeight = 100;

/**
 * An Ecdar System
 */
export class System
	extends AutomatonClass<RawSystem>
	implements HasId<SystemId>
{
	constructor(
		/**
		 * The name of the system
		 */
		readonly id: SystemId,

		/**
		 * The description of the system
		 */
		public description: string = "",

		/**
		 * The position of the system
		 */
		public position: Position = new Position(defaultX, defaultY),

		/**
		 * The dimensions of the system
		 */
		public dimensions: Dimensions = new Dimensions(
			defaultWidth,
			defaultHeight,
		),

		/**
		 * The color of the system
		 */
		public color: string = "",

		/**
		 * The coordinate of the root of the system
		 */
		public systemRootX: number = 0,

		/**
		 * A list of all member ids in the system.
		 * Members can be component instances or operators. They all share the same unique ids to allow them to be connected with edges.
		 */
		readonly memberIds: SystemMemberIds = new SystemMemberIds(),

		/**
		 * A list of component instances in the system
		 */
		componentInstances?: ComponentInstances,

		/**
		 * A list of operators in the system
		 */
		operators?: Operators,

		/**
		 * A list of edges in the system
		 */
		public edges: SystemMemberEdge[] = [],
	) {
		super();

		this.#componentInstances =
			componentInstances || new ComponentInstances(this.memberIds);
		this.#operators = operators || new Operators(this.memberIds);
		this.membersCheck();
	}

	/**
	 * A list of component instances in the system
	 */
	get componentInstances() {
		return this.#componentInstances;
	}
	set componentInstances(value) {
		this.#componentInstances = value;
		this.membersCheck();
	}
	#componentInstances!: ComponentInstances;

	/**
	 * A list of operators in the system
	 */
	get operators() {
		return this.#operators;
	}
	set operators(value) {
		this.#operators = value;
		this.membersCheck();
	}
	#operators!: Operators;

	/**
	 * Ensures that the scoped stores are all based on the main `members` store.
	 */
	private membersCheck() {
		if (this.componentInstances.ids !== this.memberIds) {
			throw new TypeError(
				"The component instances id store must be the member id store.",
			);
		}
		if (this.operators.ids !== this.memberIds) {
			throw new TypeError(
				"The operators id store must be the member id store.",
			);
		}
	}

	/**
	 * Converts the System to a RawSystem
	 */
	toRaw() {
		return {
			name: this.id.toRaw(),
			description: this.description,
			...this.position.toRaw(),
			...this.dimensions.toRaw(),
			color: this.color,
			systemRootX: this.systemRootX,
			componentInstances: this.componentInstances.toRaw(),
			operators: this.operators.toRaw(),
			edges: this.edges.map((edge) => edge.toRaw()),
		};
	}

	/**
	 * Converts a RawSystem to a System
	 */
	static readonly fromRaw: FromRaw<
		RawSystem,
		{ id: SystemId; componentIds: Components["ids"] },
		System
	> = (raw, { id, componentIds }) => {
		const memberIds = new SystemMemberIds();
		return new System(
			id,
			raw.description,
			Position.fromRaw({ x: raw.x ?? defaultX, y: raw.y ?? defaultY }),
			Dimensions.fromRaw({
				width: raw.width ?? defaultWidth,
				height: raw.height ?? defaultHeight,
			}),
			raw.color,
			raw.systemRootX,
			memberIds,
			ComponentInstances.fromRaw(raw.componentInstances ?? [], {
				systemMemberIds: memberIds,
				componentIds,
			}),
			Operators.fromRaw(raw.operators ?? [], {
				systemMemberIds: memberIds,
			}),
			raw.edges?.map((rawSystemEdge) => {
				const parent =
					rawSystemEdge.parent === 0
						? origin
						: memberIds.get(rawSystemEdge.parent);
				if (!parent) {
					//TODO: Make this a user-friendly message with different options for recovering
					throw new TypeError(
						`Cannot generate an edge where the parent doesn't exist: ${rawSystemEdge.parent}`,
					);
				}
				const child = memberIds.get(rawSystemEdge.child);
				if (!child) {
					//TODO: Make this a user-friendly message with different options for recovering
					throw new TypeError(
						`Cannot generate an edge where the child doesn't exist: ${rawSystemEdge.child}`,
					);
				}
				return SystemMemberEdge.fromRaw(rawSystemEdge, {
					parent,
					child,
				});
			}),
		);
	};
}
