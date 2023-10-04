/**
 * The raw Object for a System that is used to save and communicate in JSON.
 * */
export type RawSystem = {
	name: string;
	description: string;
	x: number;
	y: number;
	width: number;
	height: number;
	color: string;
	systemRootX: number;
	componentInstances: {
		id: number;
		componentName: string;
		x: number;
		y: number;
	}[];
	operators: {
		id: number;
		type: string;
		x: number;
		y: number;
	}[];
	edges: {
		child: number;
		parent: number;
	}[];
};
