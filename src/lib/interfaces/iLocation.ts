import type { Point } from '../classes/draw/point'
import type { Nickname } from '../classes/automaton/nickname'
import type { Invariant } from '../classes/automaton/invariant'
import type { LocationType } from '../classes/automaton/location_type'
import type { Urgency } from '../classes/automaton/urgency'

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
}
