import { z } from "zod";
import { OperatorType } from "../OperatorType";
import { ZodRawPosition } from "../../raw/RawPosition";

/**
 * Used to parse a RawOperator through Zod
 */
export const ZodRawOperator = z.object({
	id: z.number(),
	type: z.nativeEnum(OperatorType),
	...ZodRawPosition.shape,
});

export type RawOperator = z.infer<typeof ZodRawOperator>;
