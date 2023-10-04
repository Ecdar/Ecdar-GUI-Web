/**
 * The raw Object for an Edge that is used to save and communicate in JSON.
 * */
export type RawEdge = {
	id: string;
	group: string;
	sourceLocation: string;
	targetLocation: string;
	status: string;
	select: string;
	sync: string;
	guard: string;
	update: string;
	isLocked: boolean;
	nails: {
		x: number;
		y: number;
		propertyType: string;
		propertyX: number;
		propertyY: number;
	}[];
};
