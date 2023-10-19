import type { Point } from "../draw";
import type { Property } from "./Property";

/**
 * Describes a nail on an edge
 * */
export class Nail {
	/**
	 * The position of the nail
	 * */
	position: Point;

	/**
	 * The property of this nail
	 * */
	property: Property;

	constructor(property: Property, position: Point) {
		this.position = position;
		this.property = property;
	}
}
