import { z } from "zod";

/**
 * Used to parse a RawComponentEdge through Zod
 */
export const ZodRawComponentEdge = z.object({
	child: z.number(),
	parent: z.number(),
});

export type RawComponentEdge = z.infer<typeof ZodRawComponentEdge>;
