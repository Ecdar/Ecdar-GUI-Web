

/**
* Describes the edges of a system.
* */
export class SystemEdge {
	/**
	* The beginning of the edge
	* */
	parent: number;

	/**
	* The end of the edge
	* */
	child: number;
	constructor(parent: number, child: number) {
		this.parent = parent;
		this.child = child;
	}
}
