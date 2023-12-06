import { z } from "zod";
import { ZodRawSystemMemberId } from "./RawSystemMemberId";
import { OperatorType } from "../OperatorType";
import { ZodRawPosition } from "../../raw/RawPosition";

/**
 * Used to parse a RawOperator through Zod
 */
export const ZodRawOperator = z.object({
	id: ZodRawSystemMemberId,
	type: z.nativeEnum(OperatorType),
	...ZodRawPosition.shape,
});

export type RawOperator = z.infer<typeof ZodRawOperator>;
