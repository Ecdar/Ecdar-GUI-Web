import { z } from "zod";
import { ZodRawLocationEdge } from "./RawLocationEdge";

/**
 * Used to parse a RawLocationEdges through Zod
 */
export const ZodRawLocationEdges = z.array(ZodRawLocationEdge);

/**
 * The raw Object for a LocationEdges that is used to save and communicate in JSON.
 */
export type RawLocationEdges = z.infer<typeof ZodRawLocationEdges>;
