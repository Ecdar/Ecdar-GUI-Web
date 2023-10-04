import { Point } from "$lib/classes/draw";

import { PropertyType } from "./PropertyType";

/**
 * The properties of a nail
 * */
export class Property {
	/**
	 * The type of property
	 * */
	type: PropertyType = PropertyType.NONE;

	/**
	 * The position of the property
	 * */
	position: Point = new Point(0, 0);
	constructor(
		type: PropertyType = PropertyType.NONE,
		position = new Point(0, 0),
	) {
		this.type = type;
		this.position = position;
	}
}
