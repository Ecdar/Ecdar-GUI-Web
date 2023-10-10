import { z } from "zod";

export const ZodRawSystemEdge = z.object({
	child: z.number(),
	parent: z.number(),
});

export type RawSystemEdge = z.infer<typeof ZodRawSystemEdge>;
