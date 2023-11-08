import { z } from "zod";
import { ZodRawComponentInstance } from "./RawComponentInstance";

/**
 * Used to parse a RawComponentInstances through Zod
 */
export const ZodRawComponentInstances = z.array(ZodRawComponentInstance);

/**
 * The raw Object for a ComponentInstances that is used to save and communicate in JSON.
 */
export type RawComponentInstances = z.infer<typeof ZodRawComponentInstances>;
