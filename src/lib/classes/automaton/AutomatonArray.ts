import type { AutomatonClass } from "./AutomatonClass";

/**
 * Represents an array that can also be undefined.
 * This is a helper class that can simplify some logic by dealing with the complexity of an undefined array for you.
 */
export class AutomatonArray<T extends AutomatonClass<R>, R>
	extends Array<T>
	implements AutomatonClass<R[] | undefined>
{
	constructor(items: T[] = []) {
		super(...items);
	}

	/**
	 * Converts the array of items to an array of raw items.
	 */
	toRaw(): R[] | undefined {
		return this.length === 0
			? undefined
			: [...this].map((item) => item.toRaw());
	}
}
