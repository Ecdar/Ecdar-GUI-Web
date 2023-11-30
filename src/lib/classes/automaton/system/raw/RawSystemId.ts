import { z } from "zod";

/**
 * Used to parse a RawSystemId through Zod
 */
export const ZodRawSystemId = z.string();

/**
 * The raw Object for a SystemId that is used to save and communicate in JSON.
 */
export type RawSystemId = z.infer<typeof ZodRawSystemId>;
