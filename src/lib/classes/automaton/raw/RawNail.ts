import { z } from "zod";
import { PropertyType } from "../PropertyType";

/**
 * Used to parse a RawNail through Zod
 * */
export const ZodRawNail = z.object({
	x: z.number(),
	y: z.number(),
	propertyType: z.nativeEnum(PropertyType),
	propertyX: z.number(),
	propertyY: z.number(),
});

export type RawNail = z.infer<typeof ZodRawNail>;
