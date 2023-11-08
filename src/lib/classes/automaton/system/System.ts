import { AutomatonClass, type FromRaw } from "../AutomatonClass";
import type { RawSystem } from "./raw/RawSystem";
import type { HasId } from "../HasId";
import type { SystemId } from "./SystemId";
import { Position } from "../Position";
import { Dimensions } from "../Dimensions";
import { SystemMemberEdge } from "./SystemMemberEdge";
import { SystemMembers } from "./SystemMembers";
import { ComponentInstances } from "./ComponentInstances";
import { Operators } from "./Operators";

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
		public id: SystemId,

		/**
		 * The description of the system
		 */
		public description: string = "",

		/**
		 * The position of the system
		 */
		public position: Position = new Position(0, 0),

		/**
		 * The dimensions of the system
		 */
		public dimensions: Dimensions = new Dimensions(0, 0),

		/**
		 * The color of the system
		 */
		public color: string = "",

		/**
		 * The coordinate of root of the system
		 */
		public systemRootX: number = 0,

		/**
		 * A list of members in the system.
		 * Members can be component instances or operators. They all share the same unique ID's to allow them to be connected with edges.
		 */
		members: SystemMembers | undefined,

		/**
		 * A list of component instances in the system
		 */
		componentInstances: ComponentInstances | undefined,

		/**
		 * A list of operators in the system
		 */
		operators: Operators | undefined,

		/**
		 * A list of edges in the system
		 */
		public edges: SystemMemberEdge[] = [],
	) {
		super();

		this.#members = members || new SystemMembers();
		this.#componentInstances =
			componentInstances || new ComponentInstances(this.members);
		this.#operators = operators || new Operators(this.members);
		this.membersCheck();
	}

	/**
	 * A list of members in the system.
	 * Members can be component instances or operators. They all share the same unique ID's to allow them to be connected with edges.
	 */
	get members() {
		return this.#members;
	}
	set members(value) {
		this.#members = value;
		this.membersCheck();
	}
	#members!: SystemMembers;

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
		if (this.componentInstances.map !== this.members) {
			throw new TypeError(
				"The component instances map must be based on the members map.",
			);
		}
		if (this.operators.map !== this.members) {
			throw new TypeError(
				"The operators map must be based on the members map.",
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
	static readonly fromRaw: FromRaw<RawSystem, { id: SystemId }, System> = (
		raw,
		{ id },
	) => {
		const members = new SystemMembers();
		return new System(
			id,
			raw.description,
			Position.fromRaw(raw),
			Dimensions.fromRaw(raw),
			raw.color,
			raw.systemRootX,
			members,
			ComponentInstances.fromRaw(raw.componentInstances, {
				systemMembers: members,
			}),
			Operators.fromRaw(raw.operators, { systemMembers: members }),
			raw.edges.map((rawSystemEdge) => {
				const parent = members.getId(rawSystemEdge.parent);
				if (!parent) {
					//TODO: Make this a user-friendly message with different options for recovering
					throw new TypeError(
						`Cannot generate an edge where the parent doesn't exist: ${rawSystemEdge.parent}`,
					);
				}
				const child = members.getId(rawSystemEdge.child);
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
