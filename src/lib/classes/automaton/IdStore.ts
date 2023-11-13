import { Id } from "./Id";
import type { RawId } from "./raw/RawId";

/**
 * An internal enum used to hint which operation is being run.
 * Depending on the operation, different constraints and operations will run to ensure consistency.
 */
enum SetMode {
	/**
	 * This is ONLY used for internal functions where you know what you're doing.
	 */
	Internal,
	/**
	 * This is used when adding a new class that did not previously exist.
	 */
	Add,
	/**
	 * This is used when deleting an existing class.
	 */
	Delete,
}

/**
 * Defines the part of an IdMap that deals with the ID's.
 */
export interface IIdStore<I extends Id<IT, RT>, IT, RT extends RawId & IT>
	extends Iterable<I> {
	/**
	 * How many members are stored in the map.
	 */
	size: number;
	/**
	 * Will return a new ID based on the rawId you are requesting.
	 * If there already is an ID that uses this rawId, will return undefined.
	 */
	getNewIdFromRaw(rawId: RT): I | undefined;

	/**
	 * Will return a new ordered ID. The ID will follow a default naming scheme to ensure there is always a new name available.
	 */
	getNewOrderedId(): I;

	/**
	 * Will check if an ID exists in the store.
	 * This does not guarantee that there is a member associated with the id, it only guarantees that the ID exists.
	 */
	has(id: I | RT): boolean;

	/**
	 * Will get an ID if it exists.
	 */
	get(rawId: RT): I | undefined;

	/**
	 * Allows you to rename an ID if the new raw ID is not used by another ID.
	 * If the rename was succesfull, will return `true`, otherwise will return `false`.
	 */
	rename(id: I, newRawid: RT): boolean;

	/**
	 * DO NOT USE THIS.
	 * You should be using the `rename` method instead.
	 *
	 * This allows an ID to request a rename.
	 * The store will perfrm the removal of the ID, then request an ID rename, then re-add the ID.
	 */
	_rename(id: I, newRawId: RT, renamer: () => void): boolean;

	keys(): Iterable<RT>;
	values(): Iterable<I>;
	entries(): Iterable<[RT, I]>;
}

/**
 * A map of members that all have unique ID's.
 * Includes a lot of convenience functions to fix the crazy complexity of Ecdar ID's.
 * Also includes a lot of checks to make sure you are using the ID's safely.
 *
 * This emulates a `Map`, but there are many differences.
 */
export class IdStore<I extends Id<IT, RT>, IT, RT extends RawId & IT>
	implements IIdStore<I, IT, RT>
{
	constructor(
		/**
		 * The constructor that should be used when generating a new ID.
		 */
		protected idConstructor: new (id: number | IT | RT) => I,
	) {
		this.parse = new this.idConstructor(1).parse;
	}

	protected parse: I["parse"];

	/**
	 * The map of ID's that have order information.
	 */
	private orderedMap: (I | undefined)[] = [];

	/**
	 * The map of ID's that have more than one order.
	 */
	private higherOrderedMap: ((I | undefined)[] | undefined)[] = [];

	/**
	 * The map of ID's that have no order information.
	 */
	private unorderedMap = new Map<RT, I>();

	/**
	 * The next value that can be used to generate a unique ID.
	 */
	protected nextOrderedIndex: number = 0;

	/**
	 * Will find the next value that is free to generate a unique ID.
	 *
	 * This function will only look forwards. If an existing ID is deleted,
	 */
	protected findNextOrderedIndex() {
		while (this.orderedMap[this.nextOrderedIndex] !== undefined) {
			this.nextOrderedIndex++;
		}
	}

	/**
	 * The total number of ids in this store.
	 */
	get size() {
		return this.#size;
	}
	#size = 0;

	getNewIdFromRaw(rawId: IT) {
		if (this.has(rawId)) return undefined;

		const newId = new this.idConstructor(rawId);
		this.add(newId);

		return newId;
	}

	getNewOrderedId() {
		this.findNextOrderedIndex();
		const newId = new this.idConstructor(this.nextOrderedIndex);
		this.add(newId);

		return newId;
	}

	has(id: I | IT) {
		let rawId: RT;
		if (id instanceof Id) {
			this.idCheck(id);
			rawId = id.rawId;
		} else {
			rawId = this.parse(id).rawId;
		}
		return Boolean(this.get(rawId));
	}

	get(id: IT) {
		const parsed = this.parse(id);
		if (parsed.order !== undefined) {
			return this.orderedMap[parsed.order];
		} else if (parsed.orders) {
			const higherOrder = this.getHigherOrder(parsed.orders);
			return this.higherOrderedMap[higherOrder[0]]?.[higherOrder[1]];
		} else if (typeof parsed.rawId === "string") {
			return this.unorderedMap.get(parsed.rawId);
		} else {
			throw new TypeError(
				"An `id` should always have order, higherOrder, or a string-based rawId",
			);
		}
	}

	protected add(id: I) {
		return this.set(id.rawId, id, SetMode.Add);
	}

	/**
	 * Forgets an ID. This should only be used when renaming ID's.
	 *
	 * WARNING: This is dangerous, as forgetting an existing ID might mean that the store will issue an identical ID later on.
	 * That would allow two members to have the same unique ID when they are serialized.
	 */
	protected delete(id: I | IT) {
		const rawId = id instanceof Id ? id.rawId : this.parse(id).rawId;
		return this.set(rawId, undefined, SetMode.Delete);
	}

	rename(id: I, newRawId: RT): boolean {
		return id.rename(newRawId, this);
	}

	_rename(id: I, newRawInputId: IT, renamer: () => void): boolean {
		const newRawId = this.parse(newRawInputId).rawId;
		if (!this.has(id))
			throw new TypeError(
				`Cannot rename an ID that is not part of this store (${id.rawId})`,
			);
		this.idCheck(id);
		if (this.has(newRawId)) return false;
		this.delete(id);
		renamer();
		if (id.rawId !== newRawId)
			throw new Error(
				`The renamer did not work. The rawId should now be ${newRawId}, but is instead ${id.rawId}`,
			);
		this.add(id);
		return true;
	}

	/**
	 * Will check that the ID is used safely.
	 * The rawId and ID must exclusivelty match each other, and the ID order must exclusively match the ID.
	 */
	protected idCheck(id: I) {
		const storedId = this.get(id.rawId);
		if (storedId) {
			if (storedId !== id) {
				throw new TypeError(
					`This store uses a different Id that serializes to ${id.rawId}. You cannot use both in the same store.`,
				);
			}
		}
	}

	/**
	 * This method deals with the complexity of changing values in the store.
	 * If the ID has some sort of order information, it is added to efficient arrays that enable some cool use cases.
	 * If the ID is just a raw string, it is added to a fallback store that can save anything.
	 */
	private set(rawId: IT, id: I | undefined, mode: SetMode) {
		const parsed = this.parse(rawId);
		const previouslyHad = this.has(rawId);
		if (id && id.rawId !== parsed.rawId) {
			throw new TypeError(
				"The index `rawId` must match the id's `rawId`",
			);
		}
		if (!id && mode !== SetMode.Delete) {
			throw new TypeError(
				`Cannot delete the id when not in "Delete" mode`,
			);
		} else if (id && mode === SetMode.Delete) {
			throw new TypeError(`Cannot set the id when in "Delete" mode`);
		}
		switch (mode) {
			case SetMode.Add: {
				if (previouslyHad)
					throw new TypeError(
						`The member "${parsed.rawId}" cannot be added because it already exists`,
					);
				break;
			}
			case SetMode.Delete: {
				if (!previouslyHad)
					throw new TypeError(
						`The member "${parsed.rawId}" cannot be deleted because it does not exist`,
					);
				break;
			}
		}
		if (id) this.idCheck(id);
		if (parsed.order !== undefined) {
			this.orderedMap[parsed.order] = id;
			if (!id) {
				this.nextOrderedIndex = parsed.order;
			} else {
				this.findNextOrderedIndex();
			}
		} else if (parsed.orders) {
			const higherOrder = this.getHigherOrder(parsed.orders);
			this.higherOrderedMap[higherOrder[0]] ??= [];
			(this.higherOrderedMap[higherOrder[0]] as (I | undefined)[])[
				higherOrder[1]
			] = id;
		} else if (typeof parsed.rawId === "string") {
			if (!id) {
				this.unorderedMap.delete(parsed.rawId);
			} else {
				this.unorderedMap.set(parsed.rawId, id);
			}
		} else {
			throw new TypeError(
				"An `id` should always have order, higherOrder, or a string-based rawId",
			);
		}
		if (id && !previouslyHad) {
			this.#size++;
		} else if (!id && previouslyHad) {
			this.#size--;
		}
		return this;
	}

	*[Symbol.iterator]() {
		const orderedValues = this.orderedMap.values();
		let orderedEntry = orderedValues.next();
		while (orderedEntry.done === false) {
			if (orderedEntry.value) yield orderedEntry.value;
			orderedEntry = orderedValues.next();
		}

		const higherOrderedValues = this.higherOrderedMap.values();
		let higherOrderedEntry = higherOrderedValues.next();
		while (higherOrderedEntry.done === false) {
			if (higherOrderedEntry.value) {
				const orderedValues = higherOrderedEntry.value.values();
				let orderedEntry = orderedValues.next();
				while (orderedEntry.done === false) {
					if (orderedEntry.value) yield orderedEntry.value;
					orderedEntry = orderedValues.next();
				}
			}
			higherOrderedEntry = higherOrderedValues.next();
		}

		yield* this.unorderedMap.values();
	}

	values = this[Symbol.iterator];

	*keys() {
		const values = this.values();
		let entry = values.next();
		while (!entry.done) {
			yield entry.value.rawId;
			entry = values.next();
		}
	}

	*entries(): Iterable<[RT, I]> {
		const values = this.values();
		let entry = values.next();
		while (entry.done === false) {
			yield [entry.value.rawId, entry.value];
			entry = values.next();
		}
	}

	protected getHigherOrder(orders: number[]): [number, number] {
		return [orders.length, orders.reduce((total, next) => total + next, 0)];
	}
}
