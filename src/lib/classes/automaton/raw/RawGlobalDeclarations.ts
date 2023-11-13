import { z } from "zod";
import { ZodRawDeclarations } from "./RawDeclarations";

/**
 * Used to parse a RawGlobalDeclaration through Zod
 */
export const ZodRawGlobalDeclarations = z.object({
	...ZodRawDeclarations.shape,
	name: z.literal("Global Declarations").optional(),
});

/**
 * The raw Object for a GlobalDeclarations that is used to save and communicate in JSON.
 */
export type RawGlobalDeclarations = z.infer<typeof ZodRawGlobalDeclarations>;
