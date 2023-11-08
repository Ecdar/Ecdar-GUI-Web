import type { RawId } from "./raw/RawId";
import type { HasId } from "./HasId";
import { Id } from "./Id";
import { AutomatonClass } from "./AutomatonClass";
import type { IIdMap, IdMap } from "./IdMap";

export abstract class IdSubsetMap<
		C extends HasId<I>,
		I extends Id<IT, RT>,
		IT,
		RT extends RawId,
		R,
	>
	extends AutomatonClass<R>
	implements IIdMap<C, I, IT, RT>
{
	constructor(readonly map: IdMap<C, I, IT, RT, R>) {
		super();
	}

	private activeMembers: Set<I> = new Set();

	#size = 0;
	get size() {
		return this.#size;
	}

	getNewIdFromRaw(rawId: RT) {
		const newId = this.map.getNewIdFromRaw(rawId);
		if (newId) this.activeMembers.add(newId);
		return newId;
	}

	getNewOrderedId() {
		const newId = this.map.getNewOrderedId();
		if (newId) this.activeMembers.add(newId);
		return newId;
	}

	get hasId() {
		return this.map.hasId;
	}

	get getId() {
		return this.map.getId;
	}

	get renameId() {
		return this.map.renameId;
	}

	get _renameId() {
		return this.map._renameId;
	}

	has(input: C | I | RT) {
		if (!this.map.has(input)) return false;

		let id: I;
		if (input instanceof Id) {
			id = input;
		} else if (typeof input === "string" || typeof input === "number") {
			const gotId = this.map.getId(input);
			if (gotId) {
				id = gotId;
			} else {
				return false;
			}
		} else {
			id = input.id;
		}
		if (!this.activeMembers.has(id)) return false;

		return true;
	}

	get(id: I): C | undefined {
		if (!this.hasId(id)) return undefined;
		if (!this.activeMembers.has(id)) return undefined;
		return this.map.get(id);
	}

	add(member: C) {
		this.activeMembers.add(member.id);
		this.map.add(member);
		this.#size++;
		return this;
	}

	update(member: C) {
		if (!this.activeMembers.has(member.id)) {
			throw new TypeError(
				"Cannot update a member in the main store that is not active in this store.",
			);
		}

		this.map.update(member);
		return this;
	}

	delete(member: C | I) {
		const id = member instanceof Id ? member : member.id;
		if (!this.activeMembers.has(id)) {
			throw new TypeError(
				"Cannot delete a member in the main store that is not active in this store.",
			);
		}

		this.map.delete(member);
		this.activeMembers.delete(id);
		this.#size--;
		return this;
	}

	*[Symbol.iterator]() {
		const values = this.map.values();
		let entry = values.next();
		while (entry.done === false) {
			if (this.activeMembers.has(entry.value.id)) yield entry.value;
			entry = values.next();
		}
	}

	values = this[Symbol.iterator];

	*keys() {
		const values = this.values();
		let entry = values.next();
		while (!entry.done) {
			yield entry.value.id;
			entry = values.next();
		}
	}

	*entries(): Iterable<[I, C]> {
		const values = this.values();
		let entry = values.next();
		while (entry.done === false) {
			yield [entry.value.id, entry.value];
			entry = values.next();
		}
	}
}
