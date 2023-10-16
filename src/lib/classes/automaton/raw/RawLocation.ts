import { z } from "zod";
import { Urgency } from "../Urgency";
import { LocationType } from "../LocationType";

/**
 * Used to parse a RawLoaction through Zod
 * */
export const ZodRawLocation = z.object({
	id: z.string(),
	nickname: z.string(),
	invariant: z.string(),
	type: z.nativeEnum(LocationType),
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
