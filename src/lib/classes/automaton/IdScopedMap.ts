import type { RawId } from "./raw/RawId";
import type { HasId } from "./HasId";
import { Id } from "./Id";
import { AutomatonClass } from "./AutomatonClass";
import type { IIdMap, IdMap } from "./IdMap";

export abstract class IdScopedMap<
		C extends HasId<I>,
		SC extends C,
		I extends Id<IT, RT>,
		IT,
		RT extends RawId,
		R,
	>
	extends AutomatonClass<R>
	implements IIdMap<SC, I, IT, RT>
{
	constructor(
		readonly map: IdMap<any, I, IT, RT, any>,
		private memberConstructor: new (...args: any) => SC,
	) {
		super();
	}

	#size = 0;
	get size() {
		return this.#size;
	}

	get getNewIdFromRaw() {
		return this.map.getNewIdFromRaw;
	}

	get getNewOrderedId() {
		return this.map.getNewOrderedId;
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

	has(input: SC | I | RT) {
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

		const member = this.map.get(id);
		if (member === undefined) {
			return true;
		} else {
			return this.isScopedMember(member);
		}
	}

	get(id: I): SC | undefined {
		if (!this.hasId(id)) return undefined;
		const member = this.map.get(id);
		if (this.isScopedMember(member)) {
			return member;
		} else {
			return undefined;
		}
	}

	add(member: SC) {
		this.map.add(member);
		this.#size++;
		return this;
	}

	update(member: SC) {
		const existingMember = this.map.get(member.id);
		if (
			existingMember !== undefined &&
			!this.isScopedMember(existingMember)
		) {
			throw new TypeError(
				"Cannot update a member in the main store that is not of the same class as this scoped store.",
			);
		}

		this.map.update(member);
		return this;
	}

	delete(member: SC | I) {
		const id = member instanceof Id ? member : member.id;

		const existingMember = this.map.get(id);
		if (
			existingMember !== undefined &&
			!this.isScopedMember(existingMember)
		) {
			throw new TypeError(
				"Cannot delete a member in the main store that is not of the same class as this scoped store.",
			);
		}

		this.map.delete(member);
		this.#size--;
		return this;
	}

	*[Symbol.iterator]() {
		const values = this.map.values();
		let entry = values.next();
		while (entry.done === false) {
			if (this.isScopedMember(entry.value)) yield entry.value;
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

	*entries(): Iterable<[I, SC]> {
		const values = this.values();
		let entry = values.next();
		while (entry.done === false) {
			yield [entry.value.id, entry.value];
			entry = values.next();
		}
	}

	/**
	 * Ensures that the value is the scoped member and nothing else.
	 */
	private isScopedMember(member: SC | C | undefined): member is SC {
		return member !== undefined && member instanceof this.memberConstructor;
	}
}
