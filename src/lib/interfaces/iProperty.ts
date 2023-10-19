import type { PropertyType } from "$lib/classes/automaton/PropertyType";
import type { iPoint } from "./iPoint";

export interface iProperty {
	/**
	 * The type of property
	 * */
	type: PropertyType;

	/**
	 * The position of the property
	 * */
	position: iPoint;
}
