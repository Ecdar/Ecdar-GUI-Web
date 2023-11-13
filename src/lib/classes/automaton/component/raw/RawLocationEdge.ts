import { z } from "zod";
import { ZodRawLocationEdgeId } from "../../raw/RawLocationEdgeId";
import { ZodRawNail } from "./RawNail";
import { LocationEdgeStatus } from "../LocationEdgeStatus";

/**
 * Used to parse a RawLocationEdge through Zod
 */
export const ZodRawLocationEdge = z.object({
	id: ZodRawLocationEdgeId,
	group: z.string().optional(),
	sourceLocation: z.string(),
	targetLocation: z.string(),
	status: z.nativeEnum(LocationEdgeStatus).optional(),
	select: z.string().optional(),
	sync: z.string().optional(),
	guard: z.string().optional(),
	update: z.string().optional(),
	isLocked: z.boolean().optional(),
	nails: ZodRawNail.array().optional(),
});

/**
 * The raw Object for a LocationEdge that is used to save and communicate in JSON.
 */
export type RawLocationEdge = z.infer<typeof ZodRawLocationEdge>;
