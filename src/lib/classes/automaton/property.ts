import { 
  Point 
} from '$lib/classes/draw';

import { PropertyType } from "./property_type";

export class Property {
	type: PropertyType = PropertyType.NONE;
	position: Point = new Point(0, 0);
	constructor(type: PropertyType = PropertyType.NONE, position = new Point(0, 0)) {
		this.type = type;
		this.position = position;
	}
}
