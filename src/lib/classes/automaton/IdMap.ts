import type { RawId } from "./raw/RawId";
import type { HasId } from "./HasId";
import { Id } from "./Id";
import type { z } from "zod";
import { AutomatonClass } from "./AutomatonClass";
import type { IIdStore } from "./IdStore";

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
	 * This is used when updating an existing class.
	 */
	Update,
	/**
	 * This is used when deleting an existing class.
	 */
	Delete,
}

/**
 * Defines the part of an IdMap that deals with members.
 */
export interface IIdMap<
	C extends HasId<I>,
	I extends Id<IT, RT>,
	IT,
	RT extends RawId & IT,
> extends Iterable<C> {
	/**
	 * The store of all Id's that are used in this map.
	 */
	ids: IIdStore<I, IT, RT>;

	/**
	 * How many members are stored in the map.
	 */
	size: number;

	/**
	 * Will return true if that member, or a member with that ID exists in the map.
	 */
	has(input: I): boolean;

	/**
	 * Will return the member with that ID, of it exists in the store.
	 */
	get(id: I): C | undefined;

	/**
	 * Use this if you know for sure that the member exists.
	 * Will get the member with that ID. If it does not exist, will throw an exception.
	 */
	getSure(id: I): C;

	/**
	 * Will add a new member to the store.
	 *
	 * This fails if you try to add a member that already exists.
	 */
	add(member: C | I): IIdMap<C, I, IT, RT>;

	/**
	 * Will update an existing member in the store.
	 * Note: you only need to use this if you are changing the entire member class to a new one.
	 *
	 * This fails if you try to add a member that doesn't exist.
	 */
	update(member: C | I): IIdMap<C, I, IT, RT>;

	/**
	 * Will delete an existing member.
	 * Note: the map will still remember the ID, so if you want to use that ID again, you will have to keep it or get it with `getId`.
	 *
	 * This will fail if you try to delete a member that doesn't exist.
	 */
	delete(member: C | I): IIdMap<C, I, IT, RT>;

	keys(): Iterable<I>;
	values(): Iterable<C>;
	entries(): Iterable<[I, C]>;
}

/**
 * A map of members that all have unique ID's.
 * Includes a lot of convenience functions to fix the crazy complexity of Ecdar ID's.
 * Also includes a lot of checks to make sure you are using the ID's safely.
 *
 * This emulates a `Map`, but there are many differences.
 */
export abstract class IdMap<
		C extends HasId<I>,
		I extends Id<IT, RT>,
		IT,
		RT extends RawId & IT,
		R extends z.infer<z.AnyZodObject>,
	>
	extends AutomatonClass<R>
	implements IIdMap<C, I, IT, RT>
{
	constructor(
		/**
		 * The ids to use in the map.
		 */
		readonly ids: IIdStore<I, IT, RT>,
	) {
		super();
	}

	/**
	 * The map of ID's that have order information.
	 */
	private orderedMap: (C | undefined)[] = [];

	/**
	 * The map of ID's that have more than one order.
	 */
	private higherOrderedMap: ((C | undefined)[] | undefined)[] = [];

	/**
	 * The map of ID's that have no order information.
	 */
	private unorderedMap = new Map<I, C>();

	/**
	 * The next value that can be used to generate a unique ID.
	 */
	private nextOrderedIndex: number = 1;

	/**
	 * Will find the next value that is free to generate a unique ID.
	 *
	 * This function will only look forwards. If an existing ID is deleted,
	 */
	private findNextOrderedIndex() {
		while (this.orderedMap[this.nextOrderedIndex] !== undefined) {
			this.nextOrderedIndex++;
		}
	}

	/**
	 * The total number of members in this map.
	 */
	get size() {
		return this.#size;
	}
	#size = 0;

	/**
	 * Will check that the ID is used safely.
	 * The rawId and ID must exclusivelty match each other, and the ID order must exclusively match the ID.
	 */
	private idCheck(id: I) {
		const storedId = this.ids.get(id.rawId);
		if (storedId) {
			if (storedId !== id) {
				throw new TypeError(
					`This map uses a different Id that serializes to ${id.rawId}. You cannot use both in the same map.`,
				);
			}
		} else {
			const storedMember = this.get(id);
			if (storedMember && storedMember.id !== id) {
				throw new TypeError(
					`This map uses a different Id (${storedMember.id.rawId}) that is uniqely comparable to ${id.rawId}. You cannot use both in the same map.`,
				);
			}
		}
	}

	has(id: I): boolean {
		return Boolean(this.get(id));
	}

	get(id: I): C | undefined {
		if (!this.ids.has(id)) return undefined;
		this.idCheck(id);
		if (id.order !== undefined) {
			return this.orderedMap[id.order];
		} else if (id.orders && id.higherOrder) {
			return this.higherOrderedMap[id.higherOrder[0]]?.[
				id.higherOrder[1]
			];
		} else if (typeof id.rawId === "string") {
			return this.unorderedMap.get(id);
		} else {
			throw new TypeError(
				"An `id` should always have order, higherOrder, or a string-based rawId",
			);
		}
	}

	getSure(id: I) {
		const member = this.get(id);
		if (!member)
			throw new TypeError(
				"Accessing a member that should exist, but doesn't",
			);
		return member;
	}

	add(member: C) {
		return this.set(member.id, member, SetMode.Add);
	}

	update(member: C) {
		return this.set(member.id, member, SetMode.Update);
	}

	delete(member: C | I) {
		const id = member instanceof Id ? member : member.id;
		return this.set(id, undefined, SetMode.Delete);
	}

	/**
	 * This method deals with the complexity of changing values in the store.
	 * If the ID has some sort of order information, it is added to efficient arrays that enable some cool use cases.
	 * If the ID is just a raw string, it is added to a fallback store that can save anything.
	 */
	private set(id: I, member: C | undefined, mode: SetMode) {
		if (member && member.id !== id)
			throw new TypeError("The index `Id` must match the member `Id`");
		if (!member && mode !== SetMode.Delete) {
			throw new TypeError(
				`Cannot delete the member when not in "Delete" mode`,
			);
		} else if (member && mode === SetMode.Delete) {
			throw new TypeError(`Cannot set the member when in "Delete" mode`);
		}
		const previouslyHad = this.has(id);
		switch (mode) {
			case SetMode.Add: {
				if (previouslyHad)
					throw new TypeError(
						`The member "${id.rawId}" cannot be added because it already exists`,
					);
				break;
			}
			case SetMode.Update: {
				if (!previouslyHad)
					throw new TypeError(
						`The member "${id.rawId}" cannot be updated because it does not exist`,
					);
				break;
			}
			case SetMode.Delete: {
				if (!previouslyHad)
					throw new TypeError(
						`The member "${id.rawId}" cannot be deleted because it does not exist`,
					);
				break;
			}
		}
		this.idCheck(id);
		if (id.order !== undefined) {
			this.orderedMap[id.order] = member;
			if (member === undefined) {
				this.nextOrderedIndex = id.order;
			} else {
				this.findNextOrderedIndex();
			}
		} else if (id.higherOrder) {
			this.higherOrderedMap[id.higherOrder[0]] ??= [];
			(this.higherOrderedMap[id.higherOrder[0]] as (C | undefined)[])[
				id.higherOrder[1]
			] = member;
		} else if (typeof id.rawId === "string") {
			if (!member) {
				this.unorderedMap.delete(id);
			} else {
				this.unorderedMap.set(id, member);
			}
		} else {
			throw new TypeError(
				"An `id` should always have order, higherOrder, or a string-based rawId",
			);
		}
		if (member && !previouslyHad) {
			this.#size++;
		} else if (!member && previouslyHad) {
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
