import { z } from "zod";
import { ZodRawDeclarations } from "./RawDeclarations";

/**
 * Used to parse a RawSystemDeclaration through Zod
 */
export const ZodRawSystemDeclarations = z.object({
	...ZodRawDeclarations.shape,
	name: z.literal("System Declarations").optional(),
});

/**
 * The raw Object for a SystemDeclarations that is used to save and communicate in JSON.
 */
export type RawSystemDeclarations = z.infer<typeof ZodRawSystemDeclarations>;
