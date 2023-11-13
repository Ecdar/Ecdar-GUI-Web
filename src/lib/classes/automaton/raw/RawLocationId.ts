import { z } from "zod";

/**
 * Used to parse a RawLocationId through Zod
 */
export const ZodRawLocationId = z.string();

/**
 * The raw Object for a LocationId that is used to save and communicate in JSON.
 */
export type RawLocationId = z.infer<typeof ZodRawLocationId>;
