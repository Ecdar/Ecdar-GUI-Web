import type { Point } from "$lib/classes/draw";

export class Invariant {
	/**
	 * The invariant function
	 * ex c >= 8
	 * */
	fn: string;

	/**
	 * The position of the invariant
	 * */
	position: Point;

	constructor(fn: string, position: Point) {
		this.fn = fn;
		this.position = position;
	}
}
