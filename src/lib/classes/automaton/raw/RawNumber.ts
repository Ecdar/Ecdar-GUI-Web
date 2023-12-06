import { z } from "zod";

/**
 * Used to parse a number through Zod
 */
export const ZodRawNumber = z.number().finite().safe();

export type RawNumber = z.infer<typeof ZodRawNumber>;
