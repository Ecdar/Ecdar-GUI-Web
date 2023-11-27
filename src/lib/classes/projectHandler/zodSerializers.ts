/**
 * @file
 * This lib contains functions and interfaces that help convert raw components to main components, and vice-versa
 */
import type { z } from "zod";

/**
 * Serializes a raw Zod type to a prettified JSON string
 */
export function serializeRaw(raw: z.infer<z.AnyZodObject>): string {
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
		// TODO: implement some sort of user friendly error message
		throw parse.error;
	}
}
