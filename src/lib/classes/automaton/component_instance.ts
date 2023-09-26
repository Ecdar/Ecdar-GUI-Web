import type { 
  Point 
} from '$lib/classes/draw';

export class ComponentInstance {
	id: number;
	name: string;
	position: Point;

	constructor(id: number, name: string, position: Point) {
		this.id = id;
		this.name = name;
		this.position = position;
	}
}

