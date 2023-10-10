import { ZodRawLocation } from "./RawLocation";
import { ZodRawEdge } from "./RawEdge";
import { z } from "zod";

export const ZodRawComponent = z.object({
	name: z.string(),
	declarations: z.string(),
	locations: ZodRawLocation.array(),
	edges: ZodRawEdge.array(),
	description: z.string(),
	x: z.number(),
	y: z.number(),
	width: z.number(),
	height: z.number(),
	color: z.string(),
	includeInPeriodicCheck: z.boolean(),
});

/**
 * The raw Object for a Component that is used to save and communicate in JSON.
 * */
export type RawComponent = z.infer<typeof ZodRawComponent>;
