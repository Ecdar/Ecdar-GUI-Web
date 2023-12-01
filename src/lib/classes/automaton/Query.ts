import { AutomatonClass, type FromRaw } from "./AutomatonClass";
import type { RawQuery } from "./raw/RawQuery";

/**
 * An Ecdar Query
 * What should the backend do
 */
export class Query extends AutomatonClass<RawQuery> {
	constructor(
		/**
		 * The query string
		 */
		public query: string = "",

		/**
		 * A user defined comment
		 */
		public comment: string = "",

		/**
		 * Defines wether or not the query will be run periodically
		 */
		public isPeriodic: boolean = false,
	) {
		super();
	}

	/**
	 * Converts the Query to a RawQuery
	 */
	toRaw() {
		return {
			query: this.query,
			comment: this.comment,
			isPeriodic: this.isPeriodic,
		};
	}

	/**
	 * Converts a RawQuery to a Query
	 */
	static readonly fromRaw: FromRaw<RawQuery, undefined, Query> = (raw) => {
		return new Query(raw.query, raw.comment, raw.isPeriodic);
	};
}
