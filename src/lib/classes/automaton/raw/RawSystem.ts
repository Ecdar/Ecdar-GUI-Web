import { z } from "zod";
import { ZodRawComponentInstance } from "./RawComponentInstance";
import { ZodRawOperator } from "./RawOperator";
import { ZodRawSystemEdge } from "./RawSystemEdge";

/**
 * The used for Zod
 * type inference
 * */
export const ZodRawSystem = z.object({
	name: z.string(),
	description: z.string(),
	x: z.number(),
	y: z.number(),
	width: z.number(),
	height: z.number(),
	color: z.string(),
	systemRootX: z.number(),
	componentInstances: ZodRawComponentInstance.array(),
	operators: ZodRawOperator.array(),
	edges: ZodRawSystemEdge.array(),
});

/**
 * The raw Object for a System that is used to save and communicate in JSON.
 * */
export type RawSystem = z.infer<typeof ZodRawSystem>;
