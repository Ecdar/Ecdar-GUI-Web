import { z } from "zod";

export const ZodRawComponentInstance = z.object({
	id: z.number(),
	componentName: z.string(),
	x: z.number(),
	y: z.number(),
});

export type RawComponentInstance = z.infer<typeof ZodRawComponentInstance>;
