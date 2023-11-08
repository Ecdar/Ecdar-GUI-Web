import { z } from "zod";
import { ZodRawComponentInstances } from "./RawComponentInstances";
import { ZodRawOperators } from "./RawOperators";

/**
 * Used to parse a RawSystemMembers through Zod
 */
export const ZodRawSystemMembers = z
	.object({
		componentInstances: ZodRawComponentInstances,
		operators: ZodRawOperators,
	})
	.partial();

/**
 * The raw Object for a SystemMembers that is used to save and communicate in JSON.
 */
export type RawSystemMembers = z.infer<typeof ZodRawSystemMembers>;
