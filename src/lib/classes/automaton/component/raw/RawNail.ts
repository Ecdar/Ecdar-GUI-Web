import { z } from "zod";
import { ZodRawPosition } from "../../raw/RawPosition";
import { ZodRawNailProperty } from "./RawNailProperty";

/**
 * Used to parse a RawNail through Zod
 */
export const ZodRawNail = z.object({
	...ZodRawPosition.shape,
	...ZodRawNailProperty.shape,
});

export type RawNail = z.infer<typeof ZodRawNail>;
