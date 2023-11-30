import { AutomatonClass, type FromRaw } from "./AutomatonClass";
import type { RawDimensions } from "./raw/RawDimensions";

/**
 * Describes the dimensions of something
 */
export class Dimensions extends AutomatonClass<RawDimensions> {
	constructor(
		/**
		 * The width
		 */
		public width: number,

		/**
		 * The height
		 */
		public height: number,
	) {
		super();
	}

	/**
	 * Converts the Dimensions to a RawDimensions
	 */
	toRaw() {
		return {
			width: this.width,
			height: this.height,
		};
	}

	/**
	 * Converts a RawDimensions to a Dimensions
	 */
	static readonly fromRaw: FromRaw<RawDimensions, undefined, Dimensions> = (
		raw,
	) => {
		return new Dimensions(raw.width, raw.height);
	};
}
