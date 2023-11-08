import { z } from "zod";
import { ZodRawNumber } from "./RawNumber";

const ZodRawStringId = z.string();
const ZodRawNumberId = ZodRawNumber;

export type RawStringId = z.infer<typeof ZodRawStringId>;
export type RawNumberId = z.infer<typeof ZodRawNumberId>;

/**
 * Used to parse a RawId through Zod
 */
export const ZodRawId = z.union([ZodRawStringId, ZodRawNumberId]);

export type RawId = z.infer<typeof ZodRawId>;
