/**
 * @file
 * This lib contains functions and interfaces that help convert raw components to main components, and vice-versa
 */
import type { z } from "zod";

/**
 * An interface for a class that has an equivalent Raw class. It should be trivial to change between the raw and non-raw class.
 *
 * NOTE: This interface should also include the static member "FromRaw", but because typescript support for static members is really bad,
 * we just define it as a separate function and cross our fingers that all classes will implement it.
 * See https://stackoverflow.com/questions/65846848/typescript-static-methods-in-interfaces for more information.
 */
export interface HasRaw<R> {
	/**
	 * Returns the raw counter part of the class type
	 */
	toRaw: () => R;
}

/**
 * Serializes a raw Zod type to a prettified JSON string
 */
export function serializeRaw(raw: z.AnyZodObject): string {
	return JSON.stringify(raw, undefined, "\t");
}

/**
 * Parses a JSON string according to a Zod schema
 */
export function deserializeRaw<T>(
	schema: z.ZodType<T>,
	json: string,
): z.infer<typeof schema> {
	const parse = schema.safeParse(JSON.parse(json));
	if (parse.success) {
		return parse.data;
	} else {
		// TODO: implement some sort of user firendly error message
		throw parse.error;
	}
}

/**
 *
 */
export type idConverter = [RegExp, (number: Number) => string];

/**
 * Converts a cystom string id
 * @param matcher
 */
export function idFromRaw(
	converter: idConverter,
	raw: string | undefined,
): number | undefined {
	if (!raw) return undefined;

	const match = raw.match(converter[0]);
	if (!match?.groups?.id) return undefined;

	const number = parseInt(match.groups.id);
	if (isNaN(number)) return undefined;

	return number;
}
