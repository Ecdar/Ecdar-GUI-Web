import { AutomatonClass } from "./AutomatonClass";

/**
 * Defines top level declarations, such as system declarations and global declarations
 */
export abstract class Declarations<I, R> extends AutomatonClass<R> {
	constructor(
		/**
		 * The type of the declarations
		 */
		protected type: I,
		/**
		 * The declarations formatted as a string
		 * TODO: find a better way to represent declarations
		 */
		public declarations: string,
	) {
		super();
	}
}
