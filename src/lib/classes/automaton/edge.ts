import { 
  Point 
} from '$lib/classes/draw';

import {
  Status
} from '../automaton';
import type { 
  SerializeRaw,
  ToRaw,
  FromRaw,
  DeserializeRaw,
  RawEdge,
} from '../automaton'

export enum PropertyType {
	NONE = 'NONE',
	SELECTION = 'SELECTION',
	GUARD = 'GUARD',
	SYNCHRONIZATION = 'SYNCHRONIZATION',
	UPDATE = 'UPDATE'
}


export class Property {
	type: PropertyType = PropertyType.NONE;
	position: Point = new Point(0, 0);
	constructor(type: PropertyType = PropertyType.NONE, position = new Point(0, 0)) {
		this.type = type;
		this.position = position;
	}
}

export class Edge implements SerializeRaw, ToRaw<RawEdge> {
	id: string;
	group: string;
	sourceLocation: string;
	targetLocation: string;
	status: Status;
	select: string;
	guard: string;
	update: string;
	sync: string;
	isLocked: boolean;
	nails: {
		position: Point;
		property: Property;
	}[];

	constructor(
		id: string = '',
		group: string = '',
		sourceLocation: string = '',
		targetLocation: string = '',
		status: Status = Status.INPUT,
		select: string = '',
		guard: string = '',
		update: string = '',
		sync: string = '',
		isLocked: boolean = true,
		nails: {
			position: Point;
			property: Property;
		}[] = []
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
			status: this.status as string,
			select: this.select,
			guard: this.guard,
			update: this.update,
			sync: this.sync,
			isLocked: this.isLocked,
			nails: this.nails.reduce(
				(res, c) => {
					res.push({
						x: c.position.x,
						y: c.position.y,
						propertyType: c.property.type,
						propertyX: c.property.position.x,
						propertyY: c.property.position.y
					});
					return res;
				},
				<RawEdge['nails']>[]
			)
		};
	};
	serializeRaw() {
		return JSON.stringify(this.toRaw());
	}

	static fromRaw: FromRaw<RawEdge, Edge> = (raw) => {
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
			raw.nails.map((nail) => {
				return {
					position: new Point(nail.x, nail.y),
					property: new Property(
						nail.propertyType as PropertyType,
						new Point(nail.propertyX, nail.propertyY)
					)
				};
			})
		);
	};
	static deserializeRaw: DeserializeRaw<Edge> = (input) => {
		const raw: RawEdge = JSON.parse(input);
		return Edge.fromRaw(raw);
	};
}
