import {
  Backend
} from '../automaton';
import type { 
  SerializeRaw,
  ToRaw,
  FromRaw,
  DeserializeRaw,
  RawQuery
} from '../automaton'

export class Query implements SerializeRaw, ToRaw<RawQuery> {
	query: string;
	comment: string;
	isPeriodic: boolean;
	//ignoredInputs
	//ignoredOutputs
	backend: Backend;

	toRaw() {
		return {
			query: this.query,
			comment: this.comment,
			isPeriodic: this.isPeriodic,
			ignoredInputs: {},
			ignoredOutputs: {},
			backend: this.backend
		};
	};

	constructor(
		query: string = '',
		comment: string = '',
		isPeriodic: boolean = false,
		backend: Backend = Backend.REVEAAL
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

	static fromRaw: FromRaw<RawQuery, Query> = (raw) => {
		return new Query(raw.query, raw.comment, raw.isPeriodic, raw.backend as Backend);
	};

	static deserializeRaw: DeserializeRaw<Query> = (input) => {
		const raw: RawQuery = JSON.parse(input);
		return Query.fromRaw(raw);
	};
}

export class Queries implements SerializeRaw, ToRaw<RawQuery[]> {
	arr: Query[];
	constructor(arr: Query[] = []) {
		this.arr = arr;
	}

	toRaw() {
		return this.arr.map((query) => {
			return query.toRaw();
		});
	};

	serializeRaw(): string {
		const raw = this.toRaw();
		return JSON.stringify(raw);
	}

	static deserializeRaw: DeserializeRaw<Queries> = (input) => {
		const raw: RawQuery[] = JSON.parse(input);
		return Queries.fromRaw(raw);
	};

	static fromRaw: FromRaw<RawQuery[], Queries> = (raw) => {
		return new Queries(
			raw.map((rawSingle) => {
				return Query.fromRaw(rawSingle);
			})
		);
	};
}
