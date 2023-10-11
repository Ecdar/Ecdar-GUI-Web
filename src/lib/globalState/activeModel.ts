import { writable, type Writable } from "svelte/store";
import type { iLocation } from "$lib/interfaces/iLocation";
import type { iEdge } from "$lib/interfaces/iEdge";
import {
	Invariant,
	LocationType,
	Nickname,
	Property,
	PropertyType,
	Status,
	Urgency,
} from "$lib/classes/automaton";

// TODO: Move this class to its own file
export class ActiveModel {
	constructor(
		private _locations: Record<string, iLocation> = {},
		private _edges: iEdge[] = [],
	) {}

	get locations() {
		return this._locations;
	}

	get edges() {
		return this._edges;
	}
}

export const activeModel: Writable<ActiveModel> = writable(new ActiveModel());

// TODO: This is just adding temporary data
activeModel.set(
	new ActiveModel(
		{
			"1": {
				color: "#ff0000",
				id: "1",
				invariant: new Invariant("c >= 8", { x: 100, y: 300 }),
				nickname: new Nickname("nickname1", { x: 100, y: 300 }),
				position: { x: 100, y: 300 },
				type: LocationType.INITIAL,
				urgency: Urgency.NORMAL,
			},
			"2": {
				color: "#ff0000",
				id: "2",
				invariant: new Invariant("c >= 8", { x: 300, y: 300 }),
				nickname: new Nickname("nickname2", { x: 300, y: 300 }),
				position: { x: 300, y: 200 },
				type: LocationType.INITIAL,
				urgency: Urgency.NORMAL,
			},
			"3": {
				color: "#00ff00", // Example color for location 3
				id: "3",
				invariant: new Invariant("c < 8", { x: 500, y: 500 }), // Example invariant
				nickname: new Nickname("nickname3", { x: 500, y: 500 }), // Example nickname
				position: { x: 500, y: 500 }, // Example position
				type: LocationType.NORMAL, // Example location type
				urgency: Urgency.NORMAL, // Example urgency
			},
			"4": {
				color: "#0000ff", // Example color for location 4
				id: "4",
				invariant: new Invariant("c >= 10", { x: 700, y: 300 }), // Example invariant
				nickname: new Nickname("nickname4", { x: 700, y: 300 }), // Example nickname
				position: { x: 700, y: 300 }, // Example position
				type: LocationType.INITIAL, // Example location type
				urgency: Urgency.NORMAL, // Example urgency
			},
		},

		[
			{
				guard: "c >= 8",
				id: "1",
				nails: [],
				sourceLocation: "1",
				targetLocation: "2",
				status: Status.INPUT,
				sync: "",
				update: "",
			},
			{
				guard: "c >= 8",
				id: "1",
				nails: [],
				sourceLocation: "1",
				targetLocation: "2",
				status: Status.INPUT,
				sync: "",
				update: "",
			},
			// Add more edge objects here for additional connections
			{
				guard: "c < 8",
				id: "2",
				sourceLocation: "1",
				targetLocation: "3",
				status: Status.INPUT,
				sync: "",
				update: "",
				nails: [
					{
						position: { x: 350, y: 300 },
						property: new Property(PropertyType.GUARD, {
							x: 350,
							y: 300,
						}),
					},
				],
			},
			{
				guard: "c >= 10",
				id: "3",
				nails: [],
				sourceLocation: "3",
				targetLocation: "4",
				status: Status.OUTPUT,
				sync: "",
				update: "",
			},
		],
	),
);
