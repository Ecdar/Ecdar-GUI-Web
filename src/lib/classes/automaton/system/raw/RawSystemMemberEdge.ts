import { z } from "zod";
import { ZodRawSystemMemberId } from "./RawSystemMemberId";

/**
 * Used to parse a RawSystemMemberEdge through Zod
 */
export const ZodRawSystemMemberEdge = z.object({
	child: ZodRawSystemMemberId,
	parent: ZodRawSystemMemberId,
});

export type RawSystemMemberEdge = z.infer<typeof ZodRawSystemMemberEdge>;
