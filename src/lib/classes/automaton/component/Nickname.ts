import { AutomatonClass, type FromRaw } from "../AutomatonClass";
import type { RawNickname } from "./raw/RawNickname";
import { RelativePosition } from "../RelativePosition";
import type { Position } from "../Position";

const defaultRelativeX = 0;
const defaultRelativeY = 100;

/**
 * A user defined name for the location
 */
export class Nickname extends AutomatonClass<RawNickname> {
	constructor(
		/**
		 * The actual nickname
		 */
		public name: string = "",

		/**
		 * The position of the Nickname
		 */
		public position: RelativePosition,
	) {
		super();
	}

	/**
	 * Converts the Nickname to a RawNickname
	 */
	toRaw() {
		const rawPosition = this.position.toRaw();

		return {
			nickname: this.name,
			nicknameX: rawPosition.x,
			nicknameY: rawPosition.y,
		};
	}

	/**
	 * Converts a RawNickname to a Nickname
	 */
	static readonly fromRaw: FromRaw<
		RawNickname,
		{ positionReference: Position },
		Nickname
	> = (raw, references) => {
		return new Nickname(
			raw.nickname,
			RelativePosition.fromRaw(
				{
					x: raw.nicknameX ?? defaultRelativeX,
					y: raw.nicknameY ?? defaultRelativeY,
				},
				{ reference: references.positionReference },
			),
		);
	};
}
