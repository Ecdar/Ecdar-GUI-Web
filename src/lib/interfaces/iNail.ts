import type { Property } from "$lib/classes/automaton/Property";
import type { iPoint } from "./iPoint";

export interface iNail {
	position: iPoint;
	property: Property;
}
