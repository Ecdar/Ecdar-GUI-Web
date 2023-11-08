import { AutomatonClass, type FromRaw } from "../AutomatonClass";
import type { RawProperty } from "./raw/RawProperty";
import { PropertyType } from "./PropertyType";
import { RelativePosition } from "../RelativePosition";
import type { Position } from "../Position";

/**
 * The properties of a nail
 */
export class Property extends AutomatonClass<RawProperty> {
	constructor(
		/**
		 * The type of property
		 */
		public type: PropertyType = PropertyType.NONE,

		/**
		 * The position of the property
		 */
		readonly position: RelativePosition,
	) {
		super();
	}

	toRaw() {
		const rawPosition = this.position.toRaw();

		return {
			propertyType: this.type,
			propertyX: rawPosition.x,
			propertyY: rawPosition.y,
		};
	}

	static readonly fromRaw: FromRaw<
		RawProperty,
		{ positionReference: Position },
		Property
	> = (raw, references) => {
		return new Property(
			raw.propertyType,
			RelativePosition.fromRaw(
				{ x: raw.propertyX, y: raw.propertyY },
				{ reference: references.positionReference },
			),
		);
	};
}
