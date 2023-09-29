export type { RawComponent } from "./raw/component";
export type { RawDeclaration } from "./raw/declaration";
export type { RawEdge } from "./raw/edge";
export type { RawLocation } from "./raw/location";
export type { RawQuery } from "./raw/query";
export type { RawSystem } from "./raw/system";

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
