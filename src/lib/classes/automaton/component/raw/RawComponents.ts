import { z } from "zod";
import { ZodRawComponent } from "./RawComponent";

/**
 * Used to parse a RawComponents through Zod
 */
export const ZodRawComponents = z.array(ZodRawComponent).optional();

/**
 * The raw Object for a Components that is used to save and communicate in JSON.
 */
export type RawComponents = z.infer<typeof ZodRawComponents>;
