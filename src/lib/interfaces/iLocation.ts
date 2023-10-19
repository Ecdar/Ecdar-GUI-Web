import type { iPoint } from "./iPoint";
import type { iNickname } from "./iNickname";
import type { iInvariant } from "./iInvariant";
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
	position: iPoint;

	/**
	 * The Nickname of the Location
	 * */
	nickname: iNickname;

	/**
	 * The Invariant of the Location
	 * */
	invariant: iInvariant;

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
