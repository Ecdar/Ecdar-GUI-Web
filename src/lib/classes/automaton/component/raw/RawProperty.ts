import { z } from "zod";
import { NailPropertyType } from "../NailPropertyType";
import { ZodRawPosition } from "../../raw/RawPosition";

/**
 * Used to parse a RawProperty through Zod
 */
export const ZodRawProperty = z.object({
	propertyType: z.nativeEnum(NailPropertyType),
	propertyX: ZodRawPosition.shape.x,
	propertyY: ZodRawPosition.shape.y,
});

export type RawProperty = z.infer<typeof ZodRawProperty>;
