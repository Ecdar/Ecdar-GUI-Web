import { z } from "zod";
import { ZodRawNumber } from "./RawNumber";

/**
 * Used to parse a RawDimensions through Zod
 */
export const ZodRawDimensions = z.object({
	width: ZodRawNumber,
	height: ZodRawNumber,
});

export type RawDimensions = z.infer<typeof ZodRawDimensions>;
