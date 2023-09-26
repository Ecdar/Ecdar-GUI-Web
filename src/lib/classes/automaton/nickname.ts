import type { 
  Point 
} from '$lib/classes/draw';

export class Nickname {
	name: string;
	position: Point;
	constructor(name: string, position: Point) {
		this.name = name;
		this.position = position;
	}
}
