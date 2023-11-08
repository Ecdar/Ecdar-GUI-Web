import { AutomatonClass, type FromRaw } from "../AutomatonClass";
import type { RawInvariant } from "./raw/RawInvariant";
import { RelativePosition } from "../RelativePosition";
import type { Position } from "../Position";

const defaultRelativeX = 0;
const defaultRelativeY = 100;

export class Invariant extends AutomatonClass<RawInvariant> {
	constructor(
		/**
		 * The invariant function
		 * ex c >= 8
		 */
		public fn: string,

		/**
		 * The position of the invariant
		 */
		public position: RelativePosition,
	) {
		super();
	}

	toRaw() {
		const rawPosition = this.position.toRaw();

		return {
			invariant: this.fn,
			invariantX: rawPosition.x,
			invariantY: rawPosition.y,
		};
	}

	static readonly fromRaw: FromRaw<
		RawInvariant,
		{ positionReference: Position },
		Invariant
	> = (raw, references) => {
		return new Invariant(
			raw.invariant,
			RelativePosition.fromRaw(
				{
					x: raw.invariantX ?? defaultRelativeX,
					y: raw.invariantY ?? defaultRelativeY,
				},
				{ reference: references.positionReference },
			),
		);
	};
}
