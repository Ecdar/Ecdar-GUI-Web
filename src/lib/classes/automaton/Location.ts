import { Point } from "$lib/classes/draw";
import { Nickname, Invariant, LocationType, Urgency } from "../automaton";
import { Raw } from "../automaton";

export class Location implements Raw.SerializeRaw, Raw.ToRaw<Raw.RawLocation> {
	/**
	 * The id of the Location
	 * */
	id: string;

	/**
	 * The position of the Location
	 * */
	position: Point;

	/**
	 * The Nickname of the Location
	 * */
	nickname: Nickname;

	/**
	 * The Invariant of the Location
	 * */
	invariant: Invariant;

	/**
	 * The Type of the Location
	 * */
	type: LocationType;

	/**
	 * The Urgency of the Location
	 * */
	urgency: Urgency;

	/**
	 * The Color of the Location
	 * */
	color: string;

	constructor(
		id: string = "",
		position: Point = new Point(0, 0),
		nickname: Nickname = new Nickname("", new Point(0, 0)),
		invariant: Invariant = new Invariant("", new Point(0, 0)),
		type: LocationType = LocationType.NORMAL,
		urgency: Urgency = Urgency.NORMAL,
		color: string = "",
	) {
		this.id = id;
		this.position = position;
		this.nickname = nickname;
		this.invariant = invariant;
		this.type = type;
		this.urgency = urgency;
		this.color = color;
	}

	/**
	 * Converts the Location into a RawLocation
	 * */
	toRaw() {
		return {
			id: this.id,
			nickname: this.nickname.name,
			invariant: this.invariant.fn,
			type: this.type,
			urgency: this.urgency,
			x: this.position.x,
			y: this.position.y,
			color: this.color,
			nicknameX: this.nickname.position.x,
			nicknameY: this.nickname.position.y,
			invariantX: this.invariant.position.x,
			invariantY: this.invariant.position.y,
		};
	}

	serializeRaw() {
		return JSON.stringify(this.toRaw());
	}

	/**
	 * Crates a Location from a RawLocation
	 * */
	static fromRaw: Raw.FromRaw<Raw.RawLocation, Location> = (raw) => {
		return new Location(
			raw.id,
			new Point(raw.x, raw.y),
			new Nickname(raw.nickname, new Point(raw.nicknameX, raw.nicknameY)),
			new Invariant(
				raw.invariant,
				new Point(raw.invariantX, raw.invariantY),
			),
			raw.type as LocationType,
			raw.urgency as Urgency,
			raw.color,
		);
	};

	/**
	 * Crates a Location from a JSON string matching a RawLocation
	 * */
	static deserializeRaw: Raw.DeserializeRaw<Location> = (input) => {
		const raw = Raw.parse(Raw.ZodRawLocation, input);
		return Location.fromRaw(raw);
	};
}
