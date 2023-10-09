import type { Property } from "$lib/classes/automaton/Property";
import type { Point } from "$lib/classes/draw/Point";

export interface iNail {
	position: Point;
	property: Property;
}
