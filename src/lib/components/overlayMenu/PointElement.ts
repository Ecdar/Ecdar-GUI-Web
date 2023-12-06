import { Point } from "./Point";
import type { VirtualElement } from "@floating-ui/dom";

/**
 * Emulates a DOM Element based on a single coordinate Point.
 *
 * This is used when calculating the position of the context menu because the API bases the position on an Element's position,
 * but we want to base the position on the mouse coordinate.
 */
export class PointElement extends Point implements VirtualElement {
	#getBoundingClientRect = () => new DOMRect(this.x, this.y);
	get getBoundingClientRect() {
		return this.#getBoundingClientRect;
	}
}
