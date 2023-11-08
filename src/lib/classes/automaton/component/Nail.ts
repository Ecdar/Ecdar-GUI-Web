import { AutomatonClass, type FromRaw } from "../AutomatonClass";
import type { RawNail } from "./raw/RawNail";
import { Position } from "../Position";
import { Property } from "./Property";

/**
 * Describes a nail on an edge
 */
export class Nail extends AutomatonClass<RawNail> {
	constructor(
		/**
		 * The position of the nail
		 */
		readonly position: Position,

		/**
		 * The property of this nail
		 */
		readonly property: Property,
	) {
		super();
		if (property.position.reference !== position)
			throw new TypeError(
				"The Property should be placed relatively to the Position of this Nail",
			);
	}

	/**
	 * Converts the Nail to a RawNail
	 */
	toRaw() {
		return {
			...this.position.toRaw(),
			...this.property.toRaw(),
		};
	}

	/**
	 * Converts a RawNail to a Nail
	 */
	static readonly fromRaw: FromRaw<RawNail, undefined, Nail> = (raw) => {
		const position = Position.fromRaw(raw);
		return new Nail(
			position,
			Property.fromRaw(raw, { positionReference: position }),
		);
	};
}
