import { z } from "zod";
import { ZodRawRelativePosition } from "../../raw/RawRelativePosition";

/**
 * Used to parse a RawNickname through Zod
 */
export const ZodRawNickname = z.object({
	nickname: z.string().optional(),
	nicknameX: ZodRawRelativePosition.shape.x.optional(),
	nicknameY: ZodRawRelativePosition.shape.y.optional(),
});

export type RawNickname = z.infer<typeof ZodRawNickname>;
