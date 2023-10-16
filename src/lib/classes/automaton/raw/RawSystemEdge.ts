import { z } from "zod";

/**
 * Used to parse a RawSystemEdge through Zod
 * */
export const ZodRawSystemEdge = z.object({
	child: z.number(),
	parent: z.number(),
});

export type RawSystemEdge = z.infer<typeof ZodRawSystemEdge>;
