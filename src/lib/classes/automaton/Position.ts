import { AutomatonClass, type FromRaw } from "./AutomatonClass";
import type { RawPosition } from "./raw/RawPosition";

/**
 * Describes a position in a coordinate system
 */
export class Position extends AutomatonClass<RawPosition> {
	constructor(
		/**
		 * The X coordinate of the position
		 */
		public x: number,

		/**
		 * The Y coordinate of the position
		 */
		public y: number,
	) {
		super();
	}

	/**
	 * Converts the Position to a RawPosition
	 */
	toRaw() {
		return {
			x: this.x,
			y: this.y,
		};
	}

	/**
	 * Converts a RawPosition to a Position
	 */
	static readonly fromRaw: FromRaw<RawPosition, undefined, Position> = (
		raw,
	) => {
		return new Position(raw.x, raw.y);
	};
}
