import { z } from "zod";

export const ZodRawOperator = z.object({
	id: z.number(),
	type: z.string(),
	x: z.number(),
	y: z.number(),
});

export type RawOperator = z.infer<typeof ZodRawOperator>;
