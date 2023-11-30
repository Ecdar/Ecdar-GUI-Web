import { z } from "zod";

/**
 * Used to parse a RawProjectId through Zod
 */
export const ZodRawProjectId = z.string();

/**
 * The raw Object for a ProjectId that is used to save and communicate in JSON.
 */
export type RawProjectId = z.infer<typeof ZodRawProjectId>;
