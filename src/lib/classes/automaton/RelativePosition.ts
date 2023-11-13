import { AutomatonClass, type FromRaw } from "./AutomatonClass";
import type { IPosition, Position } from "./Position";
import type { RawRelativePosition } from "./raw/RawRelativePosition";

/**
 * Describes a position in a coordinate system that is relative to another Position.
 *
 * If the reference Position changes coordinates, the RelativePosition will automatically change coordinates to keep the same relative distance as before.
 */
export class RelativePosition
	extends AutomatonClass<RawRelativePosition>
	implements IPosition
{
	constructor(
		/**
		 * The Position that this RelativePosition will be placed relative to.
		 */
		public reference: Position,

		/**
		 * The relative x coordinate of the point.
		 *
		 * This number does not change automatically, the RelativePosition will always be this distance from the reference Position.
		 */
		public relativeX: number,

		/**
		 * The relative y coordinate of the point.
		 *
		 * This number does not change automatically, the RelativePosition will always be this distance from the reference Position.
		 */
		public relativeY: number,
	) {
		super();
	}

	/**
	 * The absolute x coordinate of the RelativePosition.
	 *
	 * This value might change automatically to make sure the relative distance to the reference Position is correct.
	 */
	get x() {
		return this.reference.x + this.relativeX;
	}
	set x(value) {
		this.relativeX = value - this.reference.x;
	}

	/**
	 * The absolute y coordinate of the RelativePosition.
	 *
	 * This value might change automatically to make sure the relative distance to the reference Position is correct.
	 */
	get y() {
		return this.reference.y + this.relativeY;
	}
	set y(value) {
		this.relativeY = value - this.reference.y;
	}

	/**
	 * Converts the RelativePosition to a RawRelativePosition
	 */
	toRaw() {
		return {
			x: this.relativeX,
			y: this.relativeY,
		};
	}

	/**
	 * Converts a RawRelativePosition to a RelativePosition
	 */
	static readonly fromRaw: FromRaw<
		RawRelativePosition,
		{ reference: Position },
		RelativePosition
	> = (raw, references) => {
		return new RelativePosition(references.reference, raw.x, raw.y);
	};
}
