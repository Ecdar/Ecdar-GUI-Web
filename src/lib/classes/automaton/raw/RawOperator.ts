import { z } from "zod";
import { OperatorType } from "../OperatorType";

/**
 * Used to parse a RawOperator through Zod
 * */
export const ZodRawOperator = z.object({
	id: z.number(),
	type: z.nativeEnum(OperatorType),
	x: z.number(),
	y: z.number(),
});

export type RawOperator = z.infer<typeof ZodRawOperator>;
