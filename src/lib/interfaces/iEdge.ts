import type { Status } from "$lib/classes/automaton";
import type { iNail } from "./iNail";

export interface iEdge {
    id: string;
	sourceLocation: string;
	targetLocation: string;
	status: Status;
	guard: string;
	update: string;
	sync: string;
	
	nails: iNail[];
}
