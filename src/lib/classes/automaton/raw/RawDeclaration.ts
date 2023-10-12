import { z } from "zod";
import { DeclarationType } from "../DeclarationType";

/**
 * The used for Zod
 * type inference
 * */
export const ZodRawDeclaration = z.object({
	name: z.nativeEnum(DeclarationType),
	declarations: z.string(),
});

/**
 * The raw Object for a Declaration that is used to save and communicate in JSON.
 * */
export type RawDeclaration = z.infer<typeof ZodRawDeclaration>;
