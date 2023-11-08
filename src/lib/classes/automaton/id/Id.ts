import type { RawIdFromString, RawIdFromNumber } from "./raw/RawId";
import { AutomatonClass } from "../AutomatonClass";

export abstract class Id<
	R extends RawIdFromString | RawIdFromNumber,
> extends AutomatonClass<R extends string ? string : string | number> {
	constructor(private id: number | string) {
		super();
	}

	abstract get name(): string;

	abstract get order(): R extends RawIdFromNumber
		? number
		: number | undefined;
}
