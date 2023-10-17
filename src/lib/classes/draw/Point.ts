export interface PointLike {
	x: number;
	y: number;
}

/**
 * Describes a point in a coordinate system
 * */
export class Point implements PointLike {
	#x: number;
	#y: number;

	get x() {
		return this.#x;
	}
	set x(value: number) {
		this.#x = value;
	}
	get y() {
		return this.#y;
	}
	set y(value: number) {
		this.#y = value;
	}

	constructor(x: number, y: number) {
		this.#x = x;
		this.#y = y;
	}
}
