import { z } from "zod";

/**
 * The used for Zod
 * type inference
 * */
export const ZodRawNail = z.object({
	x: z.number(),
	y: z.number(),
	propertyType: z.string(),
	propertyX: z.number(),
	propertyY: z.number(),
});

export type RawNail = z.infer<typeof ZodRawNail>;
