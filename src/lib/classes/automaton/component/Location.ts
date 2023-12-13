import { AutomatonClass, type FromRaw } from "../AutomatonClass";
import type { RawLocation } from "./raw/RawLocation";
import type { LocationId } from "../LocationId";
import { LocationType } from "./LocationType";
import { LocationUrgency } from "./LocationUrgency";
import { Position } from "../Position";
import { Nickname } from "./Nickname";
import { Invariant } from "./Invariant";

const defaultX = 0;
const defaultY = 0;

export class Location extends AutomatonClass<RawLocation> {
	constructor(
		/**
		 * The id of the Location
		 */
		readonly id: LocationId,

		/**
		 * The Type of the Location
		 */
		type: LocationType = LocationType.NORMAL,

		/**
		 * The Urgency of the Location
		 */
		public urgency: LocationUrgency = LocationUrgency.NORMAL,

		/**
		 * The Color of the Location
		 */
		public color: string = "",

		/**
		 * The position of the Location
		 */
		readonly position: Position = new Position(defaultX, defaultY),

		/**
		 * The Nickname of the Location
		 */
		nickname?: Nickname,

		/**
		 * The Invariant of the Location
		 */
		invariant?: Invariant,
	) {
		super();
		this.type = type;
		this.nickname = nickname;
		this.invariant = invariant;
	}

	#type!: LocationType;
	get type() {
		return this.#type;
	}
	set type(value) {
		this.#type = value;
		if (this.type !== this.id.type) {
			throw new TypeError(
				`Cannot have a location (${this.id.rawId}) of type ${this.type} with an ID of type ${this.id.type}.`,
			);
		}
	}

	#nickname: Nickname | undefined;
	get nickname() {
		return this.#nickname;
	}
	set nickname(value) {
		this.#nickname = value;
		this.positionCheck();
	}

	#invariant: Invariant | undefined;
	get invariant() {
		return this.#invariant;
	}
	set invariant(value) {
		this.#invariant = value;
		this.positionCheck();
	}

	private positionCheck() {
		if (
			this.nickname &&
			this.nickname.position.reference !== this.position
		) {
			throw new TypeError(
				`The Nickname should be placed relatively to the Position of this Location (${this.id.rawId})`,
			);
		}
		if (
			this.invariant &&
			this.invariant.position.reference !== this.position
		) {
			throw new TypeError(
				`The Invariant should be placed relatively to the Position of this Location ${this.id.rawId}`,
			);
		}
	}

	/**
	 * Converts the Location to a RawLocation
	 */
	toRaw() {
		return {
			id: this.id.toRaw(),
			type: this.type,
			urgency: this.urgency,
			color: this.color,
			...this.position.toRaw(),
			...this.nickname?.toRaw(),
			...this.invariant?.toRaw(),
		};
	}

	/**
	 * Converts a RawLocation to a Location
	 */
	static readonly fromRaw: FromRaw<
		RawLocation,
		{ id: LocationId },
		Location
	> = (raw, { id }) => {
		const position = Position.fromRaw({
			x: raw.x ?? defaultX,
			y: raw.y ?? defaultY,
		});
		return new Location(
			id,
			raw.type === "INITIAL" ? id.type : raw.type,
			raw.urgency,
			raw.color,
			position,
			typeof raw.nickname === "string"
				? Nickname.fromRaw(raw as { nickname: string }, {
						positionReference: position,
					})
				: undefined,
			typeof raw.invariant === "string"
				? Invariant.fromRaw(raw as { invariant: string }, {
						positionReference: position,
					})
				: undefined,
		);
	};
}
