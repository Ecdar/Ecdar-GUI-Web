import { z } from "zod";
import { ZodRawPosition } from "../../raw/RawPosition";
import { ZodRawProperty } from "./RawProperty";

/**
 * Used to parse a RawNail through Zod
 */
export const ZodRawNail = z.object({
	...ZodRawPosition.shape,
	...ZodRawProperty.shape,
});

export type RawNail = z.infer<typeof ZodRawNail>;
