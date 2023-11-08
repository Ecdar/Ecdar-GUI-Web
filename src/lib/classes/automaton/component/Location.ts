import { AutomatonClass, type FromRaw } from "../AutomatonClass";
import type { RawLocation } from "./raw/RawLocation";
import type { LocationId } from "./LocationId";
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
		id: LocationId,

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
		position: Position = new Position(defaultX, defaultY),

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
		this.id = id;
		this.type = type;
		this.position = position;
		this.nickname = nickname;
		this.invariant = invariant;
	}

	#id!: LocationId;
	get id() {
		return this.#id;
	}
	set id(value) {
		this.#id = value;
		this.typeCheck();
	}

	#type!: LocationType;
	get type() {
		return this.#type;
	}
	set type(value) {
		this.#type = value;
		this.typeCheck();
	}

	#position!: Position;
	get position() {
		return this.#position;
	}
	set position(value) {
		this.#position = value;
		this.positionCheck();
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

	private typeCheck() {
		/**
		 * TODO: Ideally this warning should be an error, but it is likely that real projects will fail this check.
		 */
		if (this.type !== this.id.type) {
			console.warn(
				`Having a location (${this.id.rawId}) of type ${this.type} with an ID of type ${this.id.type} seems like a bad idea.`,
			);
		}
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
