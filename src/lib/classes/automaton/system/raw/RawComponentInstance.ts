import { z } from "zod";
import { ZodRawSystemMemberId } from "./RawSystemMemberId";
import { ZodRawPosition } from "../../raw/RawPosition";

/**
 * Used to parse a RawComponentInstance through Zod
 */
export const ZodRawComponentInstance = z.object({
	id: ZodRawSystemMemberId,
	componentName: z.string(),
	...ZodRawPosition.partial().shape,
});

export type RawComponentInstance = z.infer<typeof ZodRawComponentInstance>;
