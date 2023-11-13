import { z } from "zod";
import { ZodRawRelativePosition } from "../../raw/RawRelativePosition";

/**
 * Used to parse a RawInvariant through Zod
 */
export const ZodRawInvariant = z.object({
	invariant: z.string(),
	invariantX: ZodRawRelativePosition.shape.x.optional(),
	invariantY: ZodRawRelativePosition.shape.y.optional(),
});

export type RawInvariant = z.infer<typeof ZodRawInvariant>;
