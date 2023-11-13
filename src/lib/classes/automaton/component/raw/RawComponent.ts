import { z } from "zod";
import { ZodRawComponentId } from "./RawComponentId";
import { ZodRawLocations } from "./RawLocations";
import { ZodRawLocationEdges } from "./RawLocationEdges";
import { ZodRawPosition } from "../../raw/RawPosition";
import { ZodRawDimensions } from "../../raw/RawDimensions";

/**
 * Used to parse a RawComponent through Zod
 */
export const ZodRawComponent = z.object({
	name: ZodRawComponentId,
	declarations: z.string().optional(),
	locations: ZodRawLocations.optional(),
	edges: ZodRawLocationEdges.optional(),
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
