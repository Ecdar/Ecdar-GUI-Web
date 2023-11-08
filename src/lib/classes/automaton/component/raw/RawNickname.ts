import { z } from "zod";
import { ZodRawPosition } from "../../raw/RawPosition";

/**
 * Used to parse a RawNickname through Zod
 */
export const ZodRawNickname = z.object({
	nickname: z.string(),
	nicknameX: ZodRawPosition.shape.x.optional(),
	nicknameY: ZodRawPosition.shape.y.optional(),
});

export type RawNickname = z.infer<typeof ZodRawNickname>;
