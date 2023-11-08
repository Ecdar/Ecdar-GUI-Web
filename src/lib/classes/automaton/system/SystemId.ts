import { Id } from "../Id";
import type { RawId, RawStringId } from "../raw/RawId";

export class SystemId extends Id<RawId, RawStringId> {
	parse(rawId: string) {
		return { rawId, order: undefined, orders: undefined };
	}
}
