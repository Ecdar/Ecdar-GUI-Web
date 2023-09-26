/**
 * The raw Object for a Location that is used to save and communicate in JSON.
 * */
export type RawLocation = {
	id: string;
	nickname: string;
	invariant: string;
	type: string;
	urgency: string;
	x: number;
	y: number;
	color: string;
	nicknameX: number;
	nicknameY: number;
	invariantX: number;
	invariantY: number;
};
