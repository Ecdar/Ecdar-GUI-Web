import { z } from "zod";
import { ZodRawSystemMemberId } from "./RawSystemMemberId";

/**
 * Used to parse a RawComponentEdge through Zod
 */
export const ZodRawComponentEdge = z.object({
	child: ZodRawSystemMemberId,
	parent: ZodRawSystemMemberId,
});

export type RawComponentEdge = z.infer<typeof ZodRawComponentEdge>;
