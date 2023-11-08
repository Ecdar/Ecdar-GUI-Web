import { z } from "zod";
import { ZodRawPosition } from "../../raw/RawPosition";
import { ZodRawDimensions } from "../../raw/RawDimensions";
import { ZodRawComponentInstance } from "./RawComponentInstance";
import { ZodRawOperator } from "./RawOperator";
import { ZodRawComponentEdge } from "./RawComponentEdge";

/**
 * Used to parse a RawSystem through Zod
 */
export const ZodRawSystem = z.object({
	name: z.string(),
	description: z.string(),
	...ZodRawPosition.shape,
	...ZodRawDimensions.shape,
	color: z.string(),
	systemRootX: ZodRawPosition.shape.x,
	componentInstances: ZodRawComponentInstance.array(),
	operators: ZodRawOperator.array(),
	edges: ZodRawComponentEdge.array(),
});

/**
 * The raw Object for a System that is used to save and communicate in JSON.
 */
export type RawSystem = z.infer<typeof ZodRawSystem>;
