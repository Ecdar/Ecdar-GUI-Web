import { Point, Dimensions } from '$lib/classes/draw';
import { Operator, ComponentInstance, SystemEdge } from '../automaton';
import type {
	OperatorType,
	SerializeRaw,
	ToRaw,
	FromRaw,
	DeserializeRaw,
	RawSystem,
	Named
} from '../automaton';

/**
 * An Ecdar System
 * */
export class System implements SerializeRaw, ToRaw<RawSystem>, Named {
	/**
	 * The name of the system
	 * */
	name: string;

	/**
	 * The description of the system
	 * */
	description: string;

	/**
	 * The position of the system
	 * */
	position: Point;

	/**
	 * The dimensions of the system
	 * */
	dimensions: Dimensions;

	/**
	 * The color of the system
	 * */
	color: string;

	/**
	 * The coordinate of root of the system
	 * */
	systemRootX: number;

	/**
	 * A list of components in the system
	 * */
	componentInstances: ComponentInstance[];

	/**
	 * A list of operators in the system
	 * */
	operators: Operator[];

	/**
	 * A list of edges in the system
	 * */
	edges: SystemEdge[];

	constructor(
		name: string = '',
		description: string = '',
		position: Point = new Point(0, 0),
		dimensions: Dimensions = new Dimensions(0, 0),
		color: string = '',
		systemRootX: number = 0,
		componentInstances: ComponentInstance[] = [],
		operators: Operator[] = [],
		edges: SystemEdge[] = []
	) {
		this.name = name;
		this.description = description;
		this.position = position;
		this.dimensions = dimensions;
		this.color = color;
		this.systemRootX = systemRootX;
		this.componentInstances = componentInstances;
		this.operators = operators;
		this.edges = edges;
	}

	/**
	 * Converts the System into a RawSystem
	 * */
	toRaw() {
		return {
			name: this.name,
			description: this.description,
			x: this.position.x,
			y: this.position.y,
			width: this.dimensions.width,
			height: this.dimensions.height,
			color: this.color,
			systemRootX: this.systemRootX,
			componentInstances: this.componentInstances.map((instance) => {
				return {
					id: instance.id,
					componentName: instance.name,
					x: instance.position.x,
					y: instance.position.y
				};
			}),
			operators: this.operators.map((o) => {
				return {
					x: o.position.x,
					y: o.position.y,
					// BECAUSE OF COMPATIBILITY
					type: o.type.toLowerCase(),
					id: o.id
				};
			}),
			edges: this.edges.map((e) => {
				return {
					child: e.child,
					parent: e.parent
				};
			})
		};
	}

	serializeRaw() {
		return JSON.stringify(this.toRaw());
	}

	/**
	 * Creates a System from an object of type RawSystem
	 * */
	static fromRaw: FromRaw<RawSystem, System> = (raw) => {
		return new System(
			raw.name,
			raw.description,
			new Point(raw.x, raw.y),
			new Dimensions(raw.width, raw.height),
			raw.color,
			raw.systemRootX,
			raw.componentInstances.map((instance) => {
				return new ComponentInstance(
					instance.id,
					instance.componentName,
					new Point(instance.x, instance.y)
				);
			}),
			raw.operators.map((o) => {
				return new Operator(
					o.id,
					/// BECAUSE OF COMPATIBILITY
					o.type.toUpperCase() as OperatorType,
					new Point(o.x, o.y)
				);
			}),
			raw.edges.map((e) => {
				return new SystemEdge(e.parent, e.child);
			})
		);
	};

	/**
	 * Creates a System from a JSON string of a RawSystem
	 * */
	static deserializeRaw: DeserializeRaw<System> = (input) => {
		const raw = JSON.parse(input);
		return System.fromRaw(raw);
	};
}
