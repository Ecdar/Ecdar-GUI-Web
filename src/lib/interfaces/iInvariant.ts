import type { iPoint } from "./iPoint";

export interface iInvariant {
	/**
	 * The invariant function
	 * ex c >= 8
	 * */
	fn: string;

	/**
	 * The position of the invariant
	 * */
	position: iPoint;
};
