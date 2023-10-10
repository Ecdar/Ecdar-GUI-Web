import { Backend, Raw } from "../automaton";

/**
 * # An Ecdar Query
 * What should the backend do
 * */
export class Query implements Raw.SerializeRaw, Raw.ToRaw<Raw.RawQuery> {
	/**
	 * The query string
	 * */
	query: string;

	/**
	 * A user defined comment
	 * */
	comment: string;

	/**
	 * ???
	 * */
	isPeriodic: boolean;
	//ignoredInputs
	//ignoredOutputs

	/**
	 * What backend should the query target
	 * */
	backend: Backend;

	toRaw() {
		return {
			query: this.query,
			comment: this.comment,
			isPeriodic: this.isPeriodic,
			ignoredInputs: {},
			ignoredOutputs: {},
			backend: this.backend,
		};
	}

	constructor(
		query: string = "",
		comment: string = "",
		isPeriodic: boolean = false,
		backend: Backend = Backend.REVEAAL,
	) {
		this.query = query;
		this.comment = comment;
		this.isPeriodic = isPeriodic;
		this.backend = backend;
	}

	serializeRaw(): string {
		const raw = this.toRaw();
		return JSON.stringify(raw);
	}

	/**
	 * Creates a query from a RawQuery
	 * */
	static fromRaw: Raw.FromRaw<Raw.RawQuery, Query> = (raw) => {
		return new Query(
			raw.query,
			raw.comment,
			raw.isPeriodic,
			raw.backend as Backend,
		);
	};

	/**
	 * Creates a query from a JSON string matching a RawQuery
	 * */
	static deserializeRaw: Raw.DeserializeRaw<Query> = (input) => {
		const raw = Raw.parse(Raw.ZodRawQuery, input);
		return Query.fromRaw(raw);
	};
}

export class Queries implements Raw.SerializeRaw, Raw.ToRaw<Raw.RawQuery[]> {
	/**
	 * The array of queries
	 * */
	arr: Query[];

	constructor(arr: Query[] = []) {
		this.arr = arr;
	}

	toRaw() {
		return this.arr.map((query) => {
			return query.toRaw();
		});
	}

	serializeRaw(): string {
		const raw = this.toRaw();
		return JSON.stringify(raw);
	}

	/**
	 * Creates all Queries from an JSON array matching an array of RawQuery
	 * */
	static deserializeRaw: Raw.DeserializeRaw<Queries> = (input) => {
		const raw = Raw.parse(Raw.ZodRawQuery.array(), input);
		return Queries.fromRaw(raw);
	};

	/**
	 * Creates all Queries from an array of RawQuery
	 * */
	static fromRaw: Raw.FromRaw<Raw.RawQuery[], Queries> = (raw) => {
		return new Queries(
			raw.map((rawSingle) => {
				return Query.fromRaw(rawSingle);
			}),
		);
	};
}
