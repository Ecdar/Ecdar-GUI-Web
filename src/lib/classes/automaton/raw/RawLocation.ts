import { z } from "zod";
import { Urgency } from "../Urgency";

/**
 * The used for Zod
 * type inference
 * */
export const ZodRawLocation = z.object({
	id: z.string(),
	nickname: z.string(),
	invariant: z.string(),
	type: z.string(),
	urgency: z.nativeEnum(Urgency),
	x: z.number(),
	y: z.number(),
	color: z.string(),
	nicknameX: z.number(),
	nicknameY: z.number(),
	invariantX: z.number(),
	invariantY: z.number(),
});

/**
 * The raw Object for a Location that is used to save and communicate in JSON.
 * */
export type RawLocation = z.infer<typeof ZodRawLocation>;
