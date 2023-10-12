import type { Point } from "../classes/draw/Point";
import type { iNickname } from "./iNickname";
import type { Invariant } from "../classes/automaton/Invariant";
import type { LocationType } from "../classes/automaton/LocationType";
import type { Urgency } from "../classes/automaton/Urgency";

export interface iLocation {
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
	nickname: iNickname;

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
}
