import type { z } from "zod";

export abstract class AutomatonClass<R extends z.infer<z.AnyZodObject>> {
	/**
	 * Converts the class to its raw counterpart
	 */
	abstract toRaw(): R;
}

/**
 * Should be part of the AutomatonClass.
 *
 * A static function that returns the class T from its raw counterpart R
 */
export type FromRaw<R, C extends object | undefined, T> = C extends undefined
	? (raw: R) => T
	: (raw: R, references: C) => T;
