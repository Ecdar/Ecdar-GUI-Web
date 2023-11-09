import type { iPoint } from './iPoint';
import type { iEdge } from './iEdge';
import type { iLocation } from './iLocation';
import type { iDimensions } from './iDimensions';

export interface iComponent{
	name: string;
	declarations: string;
	locations: iLocation[];
	edges: iEdge[];
	description: string;
	position: iPoint;
	dimensions: iDimensions;
	color: string;
	includeInPeriodicCheck: boolean;
}
