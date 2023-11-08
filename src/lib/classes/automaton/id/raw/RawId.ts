import { z } from "zod";
import { ZodRawNumber } from "../../raw/RawNumber";

const RawIdFromString = z.string();
const RawIdFromNumber = ZodRawNumber;

/**
 * Used to parse a RawId through Zod
 */
export const ZodRawId = z.union([RawIdFromString, RawIdFromNumber]);

export type RawIdFromString = z.infer<typeof RawIdFromString>;
export type RawIdFromNumber = z.infer<typeof RawIdFromNumber>;
