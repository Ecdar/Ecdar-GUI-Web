import { AutomatonClass, type FromRaw } from "../AutomatonClass";
import type { RawNailProperty } from "./raw/RawNailProperty";
import { NailPropertyType } from "./NailPropertyType";
import { RelativePosition } from "../RelativePosition";
import type { Position } from "../Position";

/**
 * The properties of a nail
 */
export class NailProperty extends AutomatonClass<RawNailProperty> {
	constructor(
		/**
		 * The type of property
		 */
		public type: NailPropertyType = NailPropertyType.NONE,

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
		RawNailProperty,
		{ positionReference: Position },
		NailProperty
	> = (raw, references) => {
		return new NailProperty(
			raw.propertyType,
			RelativePosition.fromRaw(
				{ x: raw.propertyX, y: raw.propertyY },
				{ reference: references.positionReference },
			),
		);
	};
}
