import { z } from "zod";
import { ZodRawProject } from "./RawProject";

/**
 * Used to parse a RawProjects through Zod
 */
export const ZodRawProjects = z.array(ZodRawProject);

/**
 * The raw Object for a Projects that is used to save and communicate in JSON.
 */
export type RawProjects = z.infer<typeof ZodRawProjects>;
