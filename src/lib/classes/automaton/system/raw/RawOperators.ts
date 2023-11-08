import { z } from "zod";
import { ZodRawOperator } from "./RawOperator";

/**
 * Used to parse a RawOperators through Zod
 */
export const ZodRawOperators = z.array(ZodRawOperator);

/**
 * The raw Object for a Operators that is used to save and communicate in JSON.
 */
export type RawOperators = z.infer<typeof ZodRawOperators>;
