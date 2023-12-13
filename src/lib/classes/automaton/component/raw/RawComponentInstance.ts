import { z } from "zod";
import { ZodRawPosition } from "../../raw/RawPosition";

/**
 * Used to parse a RawComponentInstance through Zod
 */
export const ZodRawComponentInstance = z.object({
	id: z.number(),
	componentName: z.string(),
	...ZodRawPosition.shape,
});

export type RawComponentInstance = z.infer<typeof ZodRawComponentInstance>;
