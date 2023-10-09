import type { Property } from "$lib/classes/automaton/Property";
import type { Point } from "$lib/classes/draw/Point";

export interface iNail {
	edgeId: string;
	nailId: number;
	position: Point;
	property: Property;
}
