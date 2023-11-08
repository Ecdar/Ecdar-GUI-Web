import type { RawId, RawStringId, RawNumberId } from "./raw/RawId";
import { AutomatonClass } from "./AutomatonClass";
import type { IIdMap } from "./IdMap";

export abstract class Id<
	I,
	R extends RawNumberId | RawStringId,
> extends AutomatonClass<R> {
	constructor(id: I | R) {
		super();

		const parsed = this.parse(id);
		this.applyParse(parsed.rawId, parsed.order, parsed.orders);
	}

	protected abstract parse(id: I | R): {
		rawId: R;
		order: R extends RawNumberId ? number : number | undefined;
		orders: R extends RawNumberId ? undefined : number[] | undefined;
	};

	private applyParse(
		rawId: R,
		order: R extends RawNumberId ? number : number | undefined,
		orders: R extends RawNumberId ? undefined : number[] | undefined,
	) {
		this.#rawId = rawId;
		this.#order = order;
		this.#orders = orders;

		if (this.#orders === undefined) {
			this.#higherOrder = undefined;
		} else {
			this.#higherOrder = [
				this.#orders.length,
				this.#orders.reduce((total, next) => total + next, 0),
			];
		}
	}

	#rawId!: R;
	get rawId() {
		return this.#rawId;
	}

	#order!: R extends RawNumberId ? number : number | undefined;
	get order() {
		return this.#order;
	}

	#orders!: R extends RawNumberId ? undefined : number[] | undefined;
	get orders() {
		return this.#orders;
	}

	#higherOrder: [number, number] | undefined;
	get higherOrder() {
		return this.#higherOrder;
	}

	/**
	 * Allows you to rename an existing
	 */
	rename(newRawId: I, map: IIdMap<any, typeof this, I, R>): boolean {
		const parsed = this.parse(newRawId);
		const renamer = () => {
			this.applyParse(parsed.rawId, parsed.order, parsed.orders);
		};
		return map._renameId(this, parsed.rawId, renamer);
	}

	toRaw() {
		return this.rawId;
	}
}
