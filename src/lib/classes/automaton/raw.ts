import type { z } from "zod";
export { ZodRawComponent, type RawComponent } from "./raw/RawComponent";
export {
	ZodRawComponentInstance,
	type RawComponentInstance,
} from "./raw/RawComponentInstance";
export { ZodRawDeclaration, type RawDeclaration } from "./raw/RawDeclaration";
export { ZodRawEdge, type RawEdge } from "./raw/RawEdge";
export { ZodRawLocation, type RawLocation } from "./raw/RawLocation";
export { ZodRawNail, type RawNail } from "./raw/RawNail";
export { ZodRawOperator, type RawOperator } from "./raw/RawOperator";
export { ZodRawQuery, type RawQuery } from "./raw/RawQuery";
export { ZodRawSystem, type RawSystem } from "./raw/RawSystem";
export { ZodRawSystemEdge, type RawSystemEdge } from "./raw/RawSystemEdge";

export interface SerializeRaw {
	/**
	 * Serializes the object into a JSON string matching its raw counter part
	 */
	serializeRaw: () => string;
}

/**
 * A function type that should return the object T given a raw JSON string input
 * */
export type DeserializeRaw<T> = (input: string) => T;

export interface ToRaw<R> {
	/**
	 * Maps the object to its raw counter part
	 * */
	toRaw: () => R;
}

/**
 * A function type that should return the object T given its raw counterpart R
 * */
export type FromRaw<R, T> = (raw: R) => T;

/**
 * Parses the json string according to the ZOD schema
 */
export function parse<T>(
	schema: z.ZodType<T>,
	json: string,
): z.infer<typeof schema> {
	return schema.parse(JSON.parse(json));
}
