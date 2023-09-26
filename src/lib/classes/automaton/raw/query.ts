/**
 * The raw Object for a Query that is used to save and communicate in JSON.
 * */
export type RawQuery = {
	query: string;
	comment: string;
	isPeriodic: boolean;
	ignoredInputs: object; // Ignored for now
	ignoredOutputs: object; // Ignored for now
	backend: number;
};
