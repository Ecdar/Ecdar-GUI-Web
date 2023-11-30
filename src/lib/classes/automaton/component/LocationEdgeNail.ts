import { AutomatonClass, type FromRaw } from "../AutomatonClass";
import type { RawNail } from "./raw/RawNail";
import { Position } from "../Position";
import { NailProperty } from "./NailProperty";

/**
 * Describes a nail on an edge
 */
export class LocationEdgeNail extends AutomatonClass<RawNail> {
	constructor(
		/**
		 * The position of the nail
		 */
		readonly position: Position,

		/**
		 * The property of this nail
		 */
		readonly property: NailProperty,
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
	static readonly fromRaw: FromRaw<RawNail, undefined, LocationEdgeNail> = (
		raw,
	) => {
		const position = Position.fromRaw(raw);
		return new LocationEdgeNail(
			position,
			NailProperty.fromRaw(raw, { positionReference: position }),
		);
	};
}
