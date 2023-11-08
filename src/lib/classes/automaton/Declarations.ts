import { AutomatonClass } from "./AutomatonClass";

/**
 * Defines top level declarations, such as system declarations and global declarations
 */
export abstract class Declarations<R> extends AutomatonClass<R> {
	constructor(public declarations: string = "") {
		super();
	}
}
