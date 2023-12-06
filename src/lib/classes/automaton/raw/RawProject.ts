import { z } from "zod";
import { ZodRawComponents } from "../component/raw/RawComponents";
import { ZodRawSystems } from "../system/raw/RawSystems";
import { ZodRawQuery } from "./RawQuery";
import { ZodRawSystemDeclarations } from "./RawSystemDeclarations";
import { ZodRawGlobalDeclarations } from "./RawGlobalDeclarations";

/**
 * Used to parse a RawProject through Zod
 */
export const ZodRawProject = z.object({
	name: z.string().optional(),
	components: ZodRawComponents.optional(),
	systems: ZodRawSystems.optional(),
	queries: ZodRawQuery.array().optional(),
	systemDeclarations: ZodRawSystemDeclarations.optional(),
	globalDeclarations: ZodRawGlobalDeclarations.optional(),
});

/**
 * The raw Object for a Project that is used to save and communicate in JSON.
 */
export type RawProject = z.infer<typeof ZodRawProject>;
