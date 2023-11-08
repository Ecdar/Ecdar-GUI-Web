import type { RawId } from "./raw/RawId";
import type { HasId } from "./HasId";
import { Id } from "./Id";
import { AutomatonClass } from "./AutomatonClass";

/**
 * This is used to mark map entries that exist, but haven't gotten a member yet.
 */
const reserved = Symbol("reserved");
type Reserved = typeof reserved;

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
 * Defines the part of an IdMap that deals with the ID's.
 */
export interface IIdMapKeys<I extends Id<IT, RT>, IT, RT extends RawId> {
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
	hasId(id: I | RT): boolean;

	/**
	 * Will get an ID if it exists.
	 */
	getId(rawId: RT): I | undefined;

	/**
	 * Allows you to rename an ID if the new raw ID is not used by another ID.
	 * If the rename was succesfull, will return `true`, otherwise will return `false`.
	 */
	renameId(id: I, newRawid: RT): boolean;

	/**
	 * DO NOT USE THIS.
	 * You should be using the `rename` method instead.
	 *
	 * This allows an ID to request a rename.
	 * The store will perfrm the removal of the ID, then request an ID rename, then re-add the ID.
	 */
	_renameId(id: I, newRawId: RT, renamer: () => void): boolean;

	keys(): Iterable<I>;
}

/**
 * Defines the part of an IdMap that deals with members.
 */
export interface IIdMapValues<
	C extends HasId<I>,
	I extends Id<IT, RT>,
	IT,
	RT extends RawId,
> extends Iterable<C> {
	/**
	 * How many members are stored in the map.
	 */
	size: number;

	/**
	 * Will return true if that member, or a member with that ID exists in the map.
	 */
	has(input: C | I | RT): boolean;

	/**
	 * Will return the member with that ID, of it exists in the store.
	 */
	get(id: I): C | undefined;

	/**
	 * Will add a new member to the store.
	 *
	 * This fails if you try to add a member that already exists.
	 */
	add(member: C | I): IIdMapValues<C, I, IT, RT>;

	/**
	 * Will update an existing member in the store.
	 * Note: you only need to use this if you are changing the entire member class to a new one.
	 *
	 * This fails if you try to add a member that doesn't exist.
	 */
	update(member: C | I): IIdMapValues<C, I, IT, RT>;

	/**
	 * Will delete an existing member.
	 * Note: the map will still remember the ID, so if you want to use that ID again, you will have to keep it or get it with `getId`.
	 *
	 * This will fail if you try to delete a member that doesn't exist.
	 */
	delete(member: C | I): IIdMapValues<C, I, IT, RT>;

	values(): Iterable<C>;
}

/**
 * A map of members that all have unique ID's.
 * Includes a lot of convenience functions to fix the crazy complexity of Ecdar ID's.
 * Also includes a lot of checks to make sure you are using the ID's safely.
 *
 * This emulates a `Map`, but there are many differences.
 */
export interface IIdMap<
	C extends HasId<I>,
	I extends Id<IT, RT>,
	IT,
	RT extends RawId,
> extends IIdMapKeys<I, IT, RT>,
		IIdMapValues<C, I, IT, RT> {
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
		RT extends RawId,
		R,
	>
	extends AutomatonClass<R>
	implements IIdMap<C, I, IT, RT>
{
	constructor(
		/**
		 * The constructor that should be used when generating a new ID.
		 */
		private idConstructor: new (id: number | IT | RT) => I,
	) {
		super();
	}

	/**
	 * A map from rawId's to ID's. This is mainly used to check that all ID's will result in unique raw ID's.
	 */
	private rawIdMap = new Map<RT, I>();

	/**
	 * The map of ID's that have order information.
	 */
	private orderedMap: (C | Reserved | undefined)[] = [];

	/**
	 * The map of ID's that have more than one order.
	 */
	private higherOrderedMap: ((C | Reserved | undefined)[] | undefined)[] = [];

	/**
	 * The map of ID's that have no order information.
	 */
	private unorderedMap = new Map<I, C | Reserved>();

	/**
	 * The next value that can be used to generate a unique ID.
	 */
	private nextOrderedIndex: number = 0;

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

	#size = 0;
	get size() {
		return this.#size;
	}

	getNewIdFromRaw(rawId: RT) {
		if (this.hasId(rawId)) return undefined;

		const newId = new this.idConstructor(rawId);
		this.rememberId(newId);

		return newId;
	}

	getNewOrderedId() {
		this.findNextOrderedIndex();
		const newId = new this.idConstructor(this.nextOrderedIndex);
		this.rememberId(newId);

		return newId;
	}

	/**
	 * Adds an ID to the store of ID's. This store is used when checking that new or unknown ID's are unique.
	 */
	private rememberId(id: I) {
		this.rawIdMap.set(id.rawId, id);
		if (!this.has(id)) this.set(id, reserved, SetMode.Internal);
	}

	hasId(id: I | RT) {
		const rawId = id instanceof Id ? id.rawId : id;
		if (this.rawIdMap.has(rawId)) {
			if (id instanceof Id) this.idCheck(id);
			return true;
		} else {
			return false;
		}
	}

	getId(rawId: RT) {
		return this.rawIdMap.get(rawId);
	}

	/**
	 * Forgets an ID. This should only be used when renaming ID's.
	 *
	 * WARNING: This is dangerous, as forgetting an existing ID might mean that the store will issue an identical ID later on.
	 * This will allow two members to have the same unique ID when they are serialized.
	 */
	private forgetId(id: I | RT) {
		const rawId = id instanceof Id ? id.rawId : id;
		return this.rawIdMap.delete(rawId);
	}

	renameId(id: I, newRawId: RT): boolean {
		return id.rename(newRawId, this);
	}

	_renameId(id: I, newRawId: RT, renamer: () => void): boolean {
		if (!this.hasId(id))
			throw new TypeError(
				`Cannot rename an ID that is not part of this store (${id.rawId})`,
			);
		if (this.hasId(newRawId)) return false;
		const member = this.get(id);
		this.delete(id);
		this.forgetId(id);
		renamer();
		if (id.rawId !== newRawId)
			throw new Error(
				`The renamer did not work. The rawId should now be ${newRawId}, but is instead ${id.rawId}`,
			);
		this.rememberId(id);
		this.set(id, member, SetMode.Internal);
		return true;
	}

	/**
	 * Will check that the ID is used safely.
	 * The rawId and ID must exclusivelty match each other, and the ID order must exclusively match the ID.
	 */
	private idCheck(id: I) {
		const storedId = this.getId(id.rawId);
		if (storedId) {
			if (storedId !== id) {
				throw new TypeError(
					`This store uses a different Id that serializes to ${id.rawId}. You cannot use both in the same store.`,
				);
			}
		} else {
			const storedMember = this.get(id);
			if (this.isMember(storedMember) && storedMember.id !== id) {
				throw new TypeError(
					`This store uses a different Id (${storedMember.id.rawId}) that is uniqely comparable to ${id.rawId}. You cannot use both in the same store.`,
				);
			}
		}
	}

	has(input: C | I | RT): boolean {
		let id: I;
		if (input instanceof Id) {
			id = input;
		} else if (typeof input === "number" || typeof input === "string") {
			const candidate = this.getId(input);
			if (!candidate) return false;
			id = candidate;
		} else {
			id = input.id;
		}
		return this.isMember(this.get(id));
	}

	get(id: I): C | undefined {
		if (!this.hasId(id)) return undefined;
		this.idCheck(id);
		if (id.order) {
			return stripReserved(this.orderedMap[id.order]);
		} else if (id.orders && id.higherOrder) {
			return stripReserved(
				this.higherOrderedMap[id.higherOrder[0]]?.[id.higherOrder[1]],
			);
		} else if (typeof id.rawId === "string") {
			return stripReserved(this.unorderedMap.get(id));
		} else {
			throw new TypeError(
				"An `id` should always have order, higherOrder, or a string-based rawId",
			);
		}

		function stripReserved(
			member: C | Reserved | undefined,
		): C | undefined {
			return member === reserved ? undefined : member;
		}
	}

	add(member: C) {
		return this.set(member.id, member, SetMode.Add);
	}

	update(member: C) {
		return this.set(member.id, member, SetMode.Update);
	}

	delete(member: C | I) {
		const id = member instanceof Id ? member : member.id;
		return this.set(id, reserved, SetMode.Delete);
	}

	/**
	 * This method deals with the complexity of changing values in the store.
	 * If the ID has some sort of order information, it is added to efficient arrays that enable some cool use cases.
	 * If the ID is just a raw string, it is added to a fallback store that can save anything.
	 */
	private set(id: I, member: C | Reserved | undefined, mode: SetMode) {
		const memberIsMember = this.isMember(member);
		if (memberIsMember && member.id !== id)
			throw new TypeError("The index `Id` must match the member `Id`");
		const previousValueWasMember = this.isMember(this.get(id));
		if (mode !== SetMode.Delete && member === undefined) {
			throw new TypeError(
				`Cannot delete the member when not in "Delete" mode`,
			);
		} else if (mode === SetMode.Delete && member !== undefined) {
			throw new TypeError(`Cannot set the member when in "Delete" mode`);
		}
		this.idCheck(id);
		switch (mode) {
			case SetMode.Add: {
				if (previousValueWasMember)
					throw new TypeError(
						`The member "${id.rawId}" cannot be added because it already exists`,
					);
				this.rememberId(id);
				break;
			}
			case SetMode.Update: {
				if (!previousValueWasMember)
					throw new TypeError(
						`The member "${id.rawId}" cannot be updated because it does not exist`,
					);
				break;
			}
			case SetMode.Delete: {
				if (!previousValueWasMember)
					throw new TypeError(
						`The member "${id.rawId}" cannot be deleted because it does not exist`,
					);
				break;
			}
		}
		if (id.order) {
			this.orderedMap[id.order] = member;
			if (member === undefined) {
				this.nextOrderedIndex = id.order;
			} else {
				this.findNextOrderedIndex();
			}
		} else if (id.higherOrder) {
			this.higherOrderedMap[id.higherOrder[0]] ??= [];
			this.higherOrderedMap[id.higherOrder[0]]![id.higherOrder[1]] =
				member;
		} else if (typeof id.rawId === "string") {
			if (member === reserved || member === undefined) {
				this.unorderedMap.delete(id);
			} else {
				this.unorderedMap.set(id, member);
			}
		} else {
			throw new TypeError(
				"An `id` should always have order, higherOrder, or a string-based rawId",
			);
		}
		if (memberIsMember && !previousValueWasMember) {
			this.#size++;
		} else if (!memberIsMember && previousValueWasMember) {
			this.#size--;
		}
		return this;
	}

	*[Symbol.iterator]() {
		const orderedValues = this.orderedMap.values();
		let orderedEntry = orderedValues.next();
		while (orderedEntry.done === false) {
			if (this.isMember(orderedEntry.value)) yield orderedEntry.value;
			orderedEntry = orderedValues.next();
		}

		const unorderedValues = this.unorderedMap.values();
		let unorderedEntry = unorderedValues.next();
		while (unorderedEntry.done === false) {
			if (this.isMember(unorderedEntry.value)) yield unorderedEntry.value;
			unorderedEntry = unorderedValues.next();
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

	/**
	 * Checks whether a map value is a real member.
	 */
	private isMember(member: C | Reserved | undefined): member is C {
		return member !== undefined && member !== reserved;
	}
}
