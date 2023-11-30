import { z } from "zod";
import { ZodRawNumber } from "./RawNumber";

/**
 * Used to parse a RawPosition through Zod
 */
export const ZodRawPosition = z.object({
	x: ZodRawNumber.nonnegative(),
	y: ZodRawNumber.nonnegative(),
});

export type RawPosition = z.infer<typeof ZodRawPosition>;
