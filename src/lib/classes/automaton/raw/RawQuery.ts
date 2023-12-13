import { z } from "zod";
//import { Backend } from "../Backend";

/**
 * Used to parse a RawQuery through Zod
 */
export const ZodRawQuery = z.object({
	query: z.string().optional(),
	comment: z.string().optional(),
	isPeriodic: z.boolean().optional(),
});

/**
 * The raw Object for a Query that is used to save and communicate in JSON.
 */
export type RawQuery = z.infer<typeof ZodRawQuery>;
