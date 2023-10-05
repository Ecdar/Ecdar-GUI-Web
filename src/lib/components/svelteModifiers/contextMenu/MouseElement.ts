import { Point, type PointLike } from "$lib/classes/draw";

/**
 * Emulates a DOM Element based on a single coordinate Point.
 *
 * This is used when calculating the position of the context menu because the API bases the position on an Element,
 * but we are basing the position on a mouse coordinate.
 */
export class PositionElement extends Point {
	constructor(point: PointLike) {
		super(point.x, point.y);
	}
	#getBoundingClientRect = () => new DOMRect(this.x, this.y);
	get getBoundingClientRect() {
		return this.#getBoundingClientRect;
	}
}
