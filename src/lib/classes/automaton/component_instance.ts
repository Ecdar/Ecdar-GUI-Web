import type { 
  Point 
} from '$lib/classes/draw';

/**
* # A Component Instance 
* Is used by a System to store what components are used
* */
export class ComponentInstance {
	/**
	* The id of the component instance 
	* This must be unique and is shared by Operators
	* */
	id: number;

	/**
	* The name of the component this references
	* */
	name: string;

	/**
	* The position of the component instance
	* */
	position: Point;

	constructor(id: number, name: string, position: Point) {
		this.id = id;
		this.name = name;
		this.position = position;
	}
}

