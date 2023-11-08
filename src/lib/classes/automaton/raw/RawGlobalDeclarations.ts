import { z } from "zod";

/**
 * Used to parse a RawGlobalDeclaration through Zod
 */
export const ZodRawGlobalDeclarations = z.object({
	name: z.literal("Global declarations").optional(),
	declarations: z.string().optional(),
});

/**
 * The raw Object for a GlobalDeclarations that is used to save and communicate in JSON.
 */
export type RawGlobalDeclarations = z.infer<typeof ZodRawGlobalDeclarations>;
