import { Point, Dimensions } from "$lib/classes/draw";

import { Edge, Location } from '../automaton';
import type {
	SerializeRaw,
	ToRaw,
	FromRaw,
	DeserializeRaw,
	RawComponent,
	Named
} from '../automaton';

/**
 * # An Ecdar component
 * It stores the edges and locations of a single automaton
 * */
export class Component implements SerializeRaw, ToRaw<RawComponent>, Named {
	/**
	 * The name of the component
	 * */
	name: string = "";

	/**
	 * The declarations of the component ex "clock t;"
	 * */
	declarations: string = "";

	/**
	 * A list of Locations in the Component
	 * */
	locations: Location[] = [];

	/**
	 * A list of Edges in the Component
	 * */
	edges: Edge[] = [];

	/**
	 * A description of the Component
	 * */
	description: string = "";

	/**
	 * The position of the Component
	 * */
	position = new Point(0, 0);

	/**
	 * The dimensions of the Component
	 * */
	dimensions: Dimensions;

	/**
	 * The color of the Component
	 * */
	color: string = "0";

	/**
	 * Include in periodic checks
	 * ! Some more information might be needed !
	 * */
	includeInPeriodicCheck: boolean = false;

	constructor(
		name: string = "",
		declarations: string = "",
		locations: Location[] = [],
		edges: Edge[] = [],
		description: string = "",
		position = new Point(0, 0),
		dimensions = new Dimensions(100, 100),
		color: string = "0",
		includeInPeriodicCheck: boolean = false,
	) {
		this.name = name;
		this.declarations = declarations;
		this.locations = locations;
		this.edges = edges;
		this.description = description;
		this.position = position;
		this.dimensions = dimensions;
		this.color = color;
		this.includeInPeriodicCheck = includeInPeriodicCheck;
	}

	toRaw() {
		return {
			name: this.name,
			declarations: this.declarations,
			locations: this.locations.map((l) => {
				return l.toRaw();
			}),
			edges: this.edges.map((e) => {
				return e.toRaw();
			}),
			description: this.description,
			x: this.position.x,
			y: this.position.y,
			width: this.dimensions.width,
			height: this.dimensions.height,
			color: this.color,
			includeInPeriodicCheck: this.includeInPeriodicCheck,
		};
	}

	serializeRaw() {
		return JSON.stringify(this.toRaw());
	}

	/**
	 * Converts the Component into a RawComponent
	 * */
	static fromRaw: FromRaw<RawComponent, Component> = (raw) => {
		return new Component(
			raw.name,
			raw.declarations,
			raw.locations.map((raw) => {
				return Location.fromRaw(raw);
			}),
			raw.edges.map((raw) => {
				return Edge.fromRaw(raw);
			}),
			raw.description,
			new Point(raw.x, raw.y),
			new Dimensions(raw.width, raw.height),
			raw.color,
			raw.includeInPeriodicCheck,
		);
	};

	/**
	 * Creates a Component from a JSON string of a RawComponent
	 * */
	static deserializeRaw: DeserializeRaw<Component> = (input) => {
		const raw: RawComponent = JSON.parse(input);
		return Component.fromRaw(raw);
	};
}
