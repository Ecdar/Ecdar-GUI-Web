import { AutomatonArray } from "./AutomatonArray";
import { Query } from "./Query";
import type { RawQuery } from "./raw/RawQuery";
import type { FromRaw } from "./AutomatonClass";

export class Queries extends AutomatonArray<Query, RawQuery> {
	/**
	 * Converts an array of RawQuery to an array of Query.
	 */
	static readonly fromRaw: FromRaw<
		RawQuery[] | undefined,
		undefined,
		Queries
	> = (raw) => {
		const queries = new Queries();
		if (raw) {
			for (const rawQuery of raw) {
				queries.push(Query.fromRaw(rawQuery));
			}
		}
		return queries;
	};
}
