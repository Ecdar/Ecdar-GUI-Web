import { z } from "zod";

/**
 * Used to parse a RawComponentInstance through Zod
 * */
export const ZodRawComponentInstance = z.object({
	id: z.number(),
	componentName: z.string(),
	x: z.number(),
	y: z.number(),
});

export type RawComponentInstance = z.infer<typeof ZodRawComponentInstance>;
