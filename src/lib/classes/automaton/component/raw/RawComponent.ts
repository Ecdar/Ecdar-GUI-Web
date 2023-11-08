import { ZodRawLocation } from "./RawLocation";
import { ZodRawLocationEdge } from "./RawLocationEdge";
import { ZodRawPosition } from "../../raw/RawPosition";
import { ZodRawDimensions } from "../../raw/RawDimensions";
import { z } from "zod";

/**
 * Used to parse a RawComponent through Zod
 */
export const ZodRawComponent = z.object({
	name: z.string(),
	declarations: z.string().optional(),
	locations: ZodRawLocation.array().optional().default([]),
	edges: ZodRawLocationEdge.array().optional().default([]),
	description: z.string().optional(),
	...ZodRawPosition.partial().shape,
	...ZodRawDimensions.partial().shape,
	color: z.string().optional(),
	includeInPeriodicCheck: z.boolean().optional(),
});

/**
 * The raw Object for a Component that is used to save and communicate in JSON.
 */
export type RawComponent = z.infer<typeof ZodRawComponent>;
