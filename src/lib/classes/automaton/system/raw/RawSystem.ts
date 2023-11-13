import { z } from "zod";
import { ZodRawSystemId } from "./RawSystemId";
import { ZodRawPosition } from "../../raw/RawPosition";
import { ZodRawDimensions } from "../../raw/RawDimensions";
import { ZodRawComponentInstances } from "./RawComponentInstances";
import { ZodRawOperators } from "./RawOperators";
import { ZodRawComponentEdge } from "./RawComponentEdge";

/**
 * Used to parse a RawSystem through Zod
 */
export const ZodRawSystem = z.object({
	name: ZodRawSystemId,
	description: z.string().optional(),
	...ZodRawPosition.partial().shape,
	...ZodRawDimensions.partial().shape,
	color: z.string().optional(),
	systemRootX: ZodRawPosition.shape.x.optional(),
	componentInstances: ZodRawComponentInstances.optional(),
	operators: ZodRawOperators.optional(),
	edges: ZodRawComponentEdge.array().optional(),
});

/**
 * The raw Object for a System that is used to save and communicate in JSON.
 */
export type RawSystem = z.infer<typeof ZodRawSystem>;
