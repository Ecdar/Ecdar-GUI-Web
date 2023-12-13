import { z } from "zod";
import { ZodRawNumber } from "./RawNumber";

/**
 * Used to parse a RawRelativePosition through Zod
 */
export const ZodRawRelativePosition = z.object({
	x: ZodRawNumber,
	y: ZodRawNumber,
});

export type RawRelativePosition = z.infer<typeof ZodRawRelativePosition>;
