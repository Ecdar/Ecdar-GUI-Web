import type { iPoint } from "$lib/interfaces/iPoint";

export class Point implements iPoint {
	constructor(
		public x: number,
		public y: number,
	) {}
}
