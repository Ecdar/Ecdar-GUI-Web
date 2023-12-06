import { z } from "zod";
import { ZodRawLocation } from "./RawLocation";

/**
 * Used to parse a RawLocations through Zod
 */
export const ZodRawLocations = z.array(ZodRawLocation).optional();

/**
 * The raw Object for a Locations that is used to save and communicate in JSON.
 */
export type RawLocations = z.infer<typeof ZodRawLocations>;
