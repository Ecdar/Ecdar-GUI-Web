export type { RawComponent } from "./raw/Rawcomponent";
export type { RawDeclaration } from "./raw/RawDeclaration";
export type { RawEdge } from "./raw/RawEdge";
export type { RawLocation } from "./raw/RawLocation";
export type { RawQuery } from "./raw/RawQuery";
export type { RawSystem } from "./raw/RawSystem";

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
