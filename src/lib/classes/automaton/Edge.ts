import { Point } from "$lib/classes/draw";

import { Status, Property, PropertyType, Raw, type Nail } from "../automaton";
import type { RawNail } from "./raw/RawNail";

/**
 * # An Ecdar Edge
 * Used to define edges in an Ecdar Component
 * */
export class Edge implements Raw.SerializeRaw, Raw.ToRaw<Raw.RawEdge> {
	/**
	 * The id of the edge
	 *  - Must be "E" followed by a number and
	 *  - Must be unique
	 * */
	id: string;

	/**
	 * # Unused
	 * */
	group: string;

	/**
	 * The id of the source location
	 * */
	sourceLocation: string;

	/**
	 * The id of the target location
	 * */
	targetLocation: string;

	/**
	 * The status of the edge
	 *  - Input or
	 *  - Output
	 * */
	status: Status;

	/**
	 * Unused
	 * */
	select: string;

	/**
	 * The guard of the edge
	 * ex "c <= 7"
	 * */
	guard: string;

	/**
	 * The update of the edge
	 * ex "c := 7"
	 * */
	update: string;

	/**
	 * The input OR output variable of the edge
	 * */
	sync: string;

	/**
	 * Unused
	 * */
	isLocked: boolean;

	/**
	 * The nails of the edge
	 * Modifies the path that the edge takes
	 * Defines properties on the edge
	 * */
	nails: Nail[];

	constructor(
		id: string = "",
		group: string = "",
		sourceLocation: string = "",
		targetLocation: string = "",
		status: Status = Status.INPUT,
		select: string = "",
		guard: string = "",
		update: string = "",
		sync: string = "",
		isLocked: boolean = true,
		nails: Nail[] = [],
	) {
		this.id = id;
		this.group = group;
		this.sourceLocation = sourceLocation;
		this.targetLocation = targetLocation;
		this.status = status;
		this.select = select;
		this.guard = guard;
		this.update = update;
		this.sync = sync;
		this.isLocked = isLocked;
		this.nails = nails;
	}

	toRaw() {
		return {
			id: this.id,
			group: this.group,
			sourceLocation: this.sourceLocation,
			targetLocation: this.targetLocation,
			status: this.status,
			select: this.select,
			guard: this.guard,
			update: this.update,
			sync: this.sync,
			isLocked: this.isLocked,
			nails: this.nails.reduce<RawNail[]>((res, c): RawNail[] => {
				res.push({
					x: c.position.x,
					y: c.position.y,
					propertyType: c.property.type,
					propertyX: c.property.position.x,
					propertyY: c.property.position.y,
				});
				return res;
			}, []),
		};
	}
	serializeRaw() {
		return JSON.stringify(this.toRaw());
	}

	/**
	 * Creates an Edge from a RawEdge
	 * */
	static readonly fromRaw: Raw.FromRaw<Raw.RawEdge, Edge> = (raw) => {
		return new Edge(
			raw.id,
			raw.group,
			raw.sourceLocation,
			raw.targetLocation,
			raw.status as Status,
			raw.select,
			raw.guard,
			raw.update,
			raw.sync,
			raw.isLocked,
			raw.nails.map<Nail>((nail) => {
				return {
					position: new Point(nail.x, nail.y),
					property: new Property(
						nail.propertyType as PropertyType,
						new Point(nail.propertyX, nail.propertyY),
					),
				};
			}),
		);
	};

	/**
	 * Creates an Edge from a JSON matching a RawEdge
	 * */
	static readonly deserializeRaw: Raw.DeserializeRaw<Edge> = (input) => {
		const raw = Raw.parse(Raw.ZodRawEdge, input);
		return Edge.fromRaw(raw);
	};
}
