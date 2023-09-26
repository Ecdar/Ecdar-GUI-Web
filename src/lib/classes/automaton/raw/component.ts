
/**
* The raw Object for a Component that is used to save and communicate in JSON.
* */
export type RawComponent = {
	name: string;
	declarations: string;
	locations: RawLocation[];
	edges: RawEdge[];
	description: string;
	x: number;
	y: number;
	width: number;
	height: number;
	color: string;
	includeInPeriodicCheck: boolean;
};

