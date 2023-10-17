import type { Point } from "$lib/classes/draw";

/**
 * A user defined name for the location
 * */
export class Nickname {
	/**
	 * The actual nickname
	 * */
	name: string;

	/**
	 * The position of the Nickname
	 * */
	position: Point;

	constructor(name: string, position: Point) {
		this.name = name;
		this.position = position;
	}
}
