
import type { 
  Point 
} from '$lib/classes/draw';

export class Invariant {
	fn: string;
	position: Point;
	constructor(fn: string, position: Point) {
		this.fn = fn;
		this.position = position;
	}
}
