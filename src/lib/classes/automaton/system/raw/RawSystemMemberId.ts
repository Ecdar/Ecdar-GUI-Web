import type { z } from "zod";
import { ZodRawNumber } from "../../raw/RawNumber";

/**
 * Used to parse a RawSystemMemberId through Zod
 */
export const ZodRawSystemMemberId = ZodRawNumber;

/**
 * The raw Object for a SystemMemberId that is used to save and communicate in JSON.
 */
export type RawSystemMemberId = z.infer<typeof ZodRawSystemMemberId>;
