import { z } from "zod";
import { Backend } from "../Backend";

/**
 * The used for Zod
 * type inference
 * */
export const ZodRawQuery = z.object({
	query: z.string(),
	comment: z.string(),
	isPeriodic: z.boolean(),
	ignoredInputs: z.object({}), // Ignored for now
	ignoredOutputs: z.object({}), // Ignored for now
	backend: z.nativeEnum(Backend),
});

/**
 * The raw Object for a Query that is used to save and communicate in JSON.
 * */
export type RawQuery = z.infer<typeof ZodRawQuery>;
