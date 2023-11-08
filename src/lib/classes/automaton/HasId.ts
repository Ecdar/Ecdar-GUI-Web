import type { Id } from "./Id";
import type { RawId } from "./raw/RawId";

export interface HasId<I extends Id<RawId>> {
	id: I;
}
