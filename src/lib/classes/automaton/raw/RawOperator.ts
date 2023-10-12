import { z } from "zod";
import { OperatorType } from "../OperatorType";

export const ZodRawOperator = z.object({
	id: z.number(),
	type: z.nativeEnum(OperatorType),
	x: z.number(),
	y: z.number(),
});

export type RawOperator = z.infer<typeof ZodRawOperator>;
