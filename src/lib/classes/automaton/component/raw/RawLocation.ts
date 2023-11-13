import { z } from "zod";
import { ZodRawLocationId } from "../../raw/RawLocationId";
import { LocationType } from "../LocationType";
import { LocationUrgency } from "../LocationUrgency";
import { ZodRawPosition } from "../../raw/RawPosition";
import { ZodRawNickname } from "./RawNickname";
import { ZodRawInvariant } from "./RawInvariant";

/**
 * Used to parse a RawLoaction through Zod
 */
export const ZodRawLocation = z.object({
	id: ZodRawLocationId,
	type: z.enum(["INITIAL", ...Object.values(LocationType)]).optional(),
	urgency: z.nativeEnum(LocationUrgency).optional(),
	color: z.string().optional(),
	...ZodRawPosition.partial().shape,
	...ZodRawNickname.partial().shape,
	...ZodRawInvariant.partial().shape,
});

/**
 * The raw Object for a Location that is used to save and communicate in JSON.
 */
export type RawLocation = z.infer<typeof ZodRawLocation>;
