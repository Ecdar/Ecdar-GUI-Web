import { z } from "zod";

/**
 * Used to parse a RawLocationEdgeId through Zod
 */
export const ZodRawLocationEdgeId = z.string();

/**
 * The raw Object for a LocationEdgeId that is used to save and communicate in JSON.
 */
export type RawLocationEdgeId = z.infer<typeof ZodRawLocationEdgeId>;
