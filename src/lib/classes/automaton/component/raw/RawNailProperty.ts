import { z } from "zod";
import { NailPropertyType } from "../NailPropertyType";
import { ZodRawRelativePosition } from "../../raw/RawRelativePosition";

/**
 * Used to parse a RawNailProperty through Zod
 */
export const ZodRawNailProperty = z.object({
	propertyType: z.nativeEnum(NailPropertyType),
	propertyX: ZodRawRelativePosition.shape.x,
	propertyY: ZodRawRelativePosition.shape.y,
});

export type RawNailProperty = z.infer<typeof ZodRawNailProperty>;
