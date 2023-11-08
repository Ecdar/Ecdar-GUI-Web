import { z } from "zod";

/**
 * Used to parse a RawSystemDeclaration through Zod
 */
export const ZodRawSystemDeclarations = z.object({
	name: z.literal("System declarations").optional(),
	declarations: z.string().optional(),
});

/**
 * The raw Object for a SystemDeclarations that is used to save and communicate in JSON.
 */
export type RawSystemDeclarations = z.infer<typeof ZodRawSystemDeclarations>;
