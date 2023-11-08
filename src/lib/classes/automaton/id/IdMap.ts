import { AutomatonClass } from "../AutomatonClass";
import type { HasId } from "./HasId";
import { Id } from "./Id";

export abstract class IdSet<
	T extends number | string,
	C extends HasId<I>,
	I extends Id<T>,
	R,
> extends AutomatonClass<R> {
	constructor(private idConstructor: new (rawId: number | string) => I) {
		super();
	}

	private idMap = new Map<T extends string ? string : number | string, I>();

	private orderedMap: (C | undefined)[] = [];
	private unorderedMap = new Map<
		T extends string ? string : number | string,
		C
	>();

	private nextOrderedIndex: number = 0;
	private findNextOrderedIndex() {
		while (this.orderedMap[this.nextOrderedIndex] !== undefined) {
			this.nextOrderedIndex++;
		}
	}

	#size = 0;
	get size() {
		return this.#size;
	}

	getNewId(
		rawId: T extends string ? string : number | string | undefined,
	): I | undefined {
		if (!rawId) {
			this.findNextOrderedIndex();
			rawId = this.nextOrderedIndex;
		} else if (this.hasId(rawId)) {
			throw new TypeError();
		}

		const newId = new this.idConstructor(rawId);
		this.setId(newId);

		return newId;
	}

	private setId(id: I) {
		return this.idMap.set(id.toRaw(), id);
	}

	getId = this.idMap.get;

	hasId = this.idMap.has;

	add(member: C) {
		const idOrder = member.id.order;
		if (idOrder !== undefined) {
			if (this.orderedMap[idOrder] !== undefined) {
				throw new TypeError(
					`The member "${member.id.toRaw()}" cannot be added because it already exists`,
				);
			}
		} else {
			const rawId = member.id.toRaw();
			if (this.unorderedMap.has(rawId) === true) {
				throw new TypeError(
					`The member "${member.id.toRaw()}" cannot be added because it already exists`,
				);
			}
		}
		return this.set(member);
	}

	update(member: C) {
		const idOrder = member.id.order;
		if (idOrder !== undefined) {
			if (this.orderedMap[idOrder] === undefined) {
				throw new TypeError(
					`The member "${member.id.toRaw()}" cannot be updated because it does not exist`,
				);
			}
		} else {
			const rawId = member.id.toRaw();
			if (this.unorderedMap.has(rawId) === false) {
				throw new TypeError(
					`The member "${member.id.toRaw()}" cannot be updated because it does not exist`,
				);
			}
		}
		return this.set(member);
	}

	set(member: C) {
		this.setId(member.id);
		const idOrder = member.id.order;
		if (idOrder !== undefined) {
			if (this.orderedMap[idOrder] === undefined) {
				this.#size++;
			}
			this.orderedMap[idOrder] = member;
			this.findNextOrderedIndex();
		} else {
			const rawId = member.id.toRaw();
			if (this.unorderedMap.has(rawId) === false) {
				this.#size++;
			}
			this.unorderedMap.set(rawId, member);
		}
		return this;
	}

	clear() {
		this.#size = 0;
		this.orderedMap.length = 0;
		this.unorderedMap.clear();
	}

	delete(member: C | I) {
		const id = member instanceof Id ? member : member.id;
		const idOrder = id.order;
		if (idOrder !== undefined) {
			if (this.orderedMap[idOrder] !== undefined) {
				this.orderedMap[idOrder] === undefined;
				this.#size--;
				if (idOrder < this.nextOrderedIndex) {
					this.nextOrderedIndex = idOrder;
				}
				return true;
			} else {
				return false;
			}
		} else {
			const deleted = this.unorderedMap.delete(id.toRaw());
			if (deleted === true) {
				this.#size--;
			}
			return deleted;
		}
	}

	get(id: I) {
		const idOrder = id.order;
		if (idOrder !== undefined) {
			return this.orderedMap[idOrder];
		} else {
			return this.unorderedMap.get(id.toRaw());
		}
	}

	has(member: C | I) {
		const id = member instanceof Id ? member : member.id;
		const idOrder = id.order;
		if (idOrder !== undefined) {
			return Boolean(this.orderedMap[idOrder]);
		} else {
			return this.unorderedMap.has(id.toRaw());
		}
	}

	*[Symbol.iterator]() {
		const orderedValues = this.orderedMap.values();
		let orderedEntry = orderedValues.next();
		while (orderedEntry.done === false) {
			if (orderedEntry.value !== undefined) yield orderedEntry.value;
			orderedEntry = orderedValues.next();
		}

		yield* this.unorderedMap.values();
	}

	values = this[Symbol.iterator];

	*keys() {
		const values = this.values();
		let entry = values.next();
		while (entry.done === false) {
			yield entry.value.id;
			entry = values.next();
		}
	}

	*entries() {
		const values = this.values();
		let entry = values.next();
		while (entry.done === false) {
			yield [entry.value.id, entry.value];
			entry = values.next();
		}
	}
}
