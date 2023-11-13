import { z } from "zod";

/**
 * Used to parse a RawDecalaration through Zod
 */
export const ZodRawDeclarations = z.object({
	name: z.string(),
	declarations: z.string().optional(),
});

/**
 * The raw Object for a Declaration that is used to save and communicate in JSON.
 */
export type RawDeclarations = z.infer<typeof ZodRawDeclarations>;
