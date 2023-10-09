import type { Property } from "$lib/classes/automaton/property";
import type { Point } from "$lib/classes/draw/point";

export interface iNail {
	position: Point;
	property: Property;
}
