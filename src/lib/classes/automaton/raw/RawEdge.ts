import { z } from "zod";
import { ZodRawNail } from "./RawNail";
import { Status } from "../Status";

/**
 * Used to parse a RawEdge through Zod
 * */
export const ZodRawEdge = z.object({
	id: z.string(),
	group: z.string(),
	sourceLocation: z.string(),
	targetLocation: z.string(),
	status: z.nativeEnum(Status),
	select: z.string(),
	sync: z.string(),
	guard: z.string(),
	update: z.string(),
	isLocked: z.boolean(),
	nails: ZodRawNail.array(),
});

/**
 * The raw Object for an Edge that is used to save and communicate in JSON.
 * */
export type RawEdge = z.infer<typeof ZodRawEdge>;
