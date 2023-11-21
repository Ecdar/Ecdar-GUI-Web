import { z } from "zod";
import { ZodRawSystem } from "./RawSystem";

/**
 * Used to parse a RawSystems through Zod
 */
export const ZodRawSystems = z.array(ZodRawSystem).optional();

/**
 * The raw Object for a Systems that is used to save and communicate in JSON.
 */
export type RawSystems = z.infer<typeof ZodRawSystems>;
