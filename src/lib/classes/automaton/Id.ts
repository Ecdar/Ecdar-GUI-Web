import type { RawId, RawNumberId } from "./raw/RawId";
import { AutomatonClass } from "./AutomatonClass";
import type { IIdStore } from "./IdStore";
import type { IIdMap } from "./IdMap";
import type { HasId } from "./HasId";

/**
 * Id's are unique classes that also contain a unique raw value that they can serialize to and from.
 *
 * They can contain numeric information, allowing you to order them and generate the next Id in the list.
 * THey can also just be text-based, requiring manual unique input for each new Id.
 */
export abstract class Id<I, R extends RawId & I> extends AutomatonClass<R> {
	constructor(id: I | R) {
		super();

		const parsed = this.parse(id);
		this.applyParse(parsed);
	}

	/**
	 * This is the id-specific parser. It will take either a rawId, or a custom input and parse it into
	 * all the values that an Id exposes.
	 */
	abstract parse(
		this: void,
		id: I | R,
	): {
		rawId: R;
		order: R extends RawNumberId ? number : number | undefined;
		orders: R extends RawNumberId ? undefined : number[] | undefined;
	};

	/**
	 * Applies the parsing logic to convert an input id to all the values that the ID exposes.
	 */
	protected abstract applyParse(parsed: {
		rawId: R;
		order: R extends RawNumberId ? number : number | undefined;
		orders: R extends RawNumberId ? undefined : number[] | undefined;
	}): void;

	/**
	 * The id value that is used when serializing the id. This must be unique.
	 */
	get rawId() {
		return this._rawId;
	}
	protected _rawId!: R;

	/**
	 * If the Id encodes som sort of numerical values, it will be exposed here.
	 */
	get order() {
		return this._order;
	}
	protected _order!: R extends RawNumberId ? number : number | undefined;

	/**
	 * If the Id encodes more than one numeric value, they will be exposed in an array here.
	 */
	get orders() {
		return this._orders;
	}
	protected _orders!: R extends RawNumberId
		? undefined
		: number[] | undefined;

	/**
	 * If the Id encodes more than one numeric value, a higherOrder will be defined.
	 * The first value determines the degree of the higher order, and the next value determines the actual order of the higher order.
	 */
	get higherOrder() {
		if (this._orders === undefined) {
			return undefined;
		} else {
			return [
				this._orders.length,
				this._orders.reduce((total, next) => total + next, 0),
			];
		}
	}

	/**
	 * Renames this Id if the new rawId is not already used.
	 * Returns a boolean that indicates if the rename was succesful or blocked because the rawId was already used.
	 */
	rename(newRawId: I, map: IIdStore<typeof this, I, R>): boolean {
		const parsed = this.parse(newRawId);
		const renamer = () => {
			this.applyParse(parsed);
		};
		return map._rename(this, parsed.rawId, renamer);
	}

	/**
	 * This is used in some cases where multiple stores share the same id store, but cannot use the same id in separate stores.
	 * When a store registers an Id, it adds itself as the owner, ensuring that other stores won't use it.
	 */
	owner: IIdMap<HasId<typeof this>, typeof this, I, R> | undefined;

	/**
	 * Converts the Id to a RawId
	 */
	toRaw() {
		return this.rawId;
	}
}
