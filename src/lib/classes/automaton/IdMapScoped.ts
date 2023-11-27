import type { RawId } from "./raw/RawId";
import type { HasId } from "./HasId";
import { Id } from "./Id";
import { IdMap } from "./IdMap";

/**
 * A map of members that all have unique ID's.
 * Includes a lot of convenience functions to fix the crazy complexity of Ecdar ID's.
 * Also includes a lot of checks to make sure you are using the ID's safely.
 *
 * This emulates a `Map`, but there are many differences.
 */
export abstract class IdMapScoped<
	C extends HasId<I>,
	I extends Id<IT, RT>,
	IT extends string | number | object,
	RT extends RawId & IT,
	R,
> extends IdMap<C, I, IT, RT, R> {
	has(id: I): boolean {
		if (id.owner !== this) return false;
		return super.has(id);
	}

	get(id: I): C | undefined {
		if (id.owner !== this)
			throw new TypeError(
				`Trying to use get an id that is not owned by this map: ${id.rawId}`,
			);
		return super.get(id);
	}

	add(member: C) {
		if (member.id.owner && member.id.owner !== this)
			throw new TypeError(
				`Trying to use an id that is owned by a different map: ${member.id.rawId}`,
			);
		member.id.owner = this;
		return super.add(member);
	}

	update(member: C) {
		if (member.id.owner !== this)
			throw new TypeError(
				`Trying to use update an id that is not owned by this map: ${member.id.rawId}`,
			);
		return super.update(member);
	}

	delete(member: C | I) {
		const id = member instanceof Id ? member : member.id;
		if (id.owner !== this)
			throw new TypeError(
				`Trying to delete an id that is not owned by this map: ${id.rawId}`,
			);
		id.owner = undefined;
		return super.delete(member);
	}
}
