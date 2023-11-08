import type { Id } from "./Id";

export interface HasId<I extends Id<number | string>> {
	id: I;
}
