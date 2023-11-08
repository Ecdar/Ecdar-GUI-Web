import { z } from "zod";
import { ZodRawNumber } from "../../raw/RawNumber";

/**
 * Used to parse a RawInvariant through Zod
 */
export const ZodRawInvariant = z.object({
	invariant: z.string(),
	invariantX: ZodRawNumber.optional(),
	invariantY: ZodRawNumber.optional(),
});

export type RawInvariant = z.infer<typeof ZodRawInvariant>;
