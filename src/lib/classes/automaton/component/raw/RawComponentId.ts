import { z } from "zod";

/**
 * Used to parse a RawComponentId through Zod
 */
export const ZodRawComponentId = z.string();

/**
 * The raw Object for a ComponentId that is used to save and communicate in JSON.
 */
export type RawComponentId = z.infer<typeof ZodRawComponentId>;
