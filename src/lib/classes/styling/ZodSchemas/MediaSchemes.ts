import { z } from "zod";
import { MediaScheme, RequiredMediaScheme, CustomScheme } from "./MediaScheme";

/**
 * User defineable schemes
 */
export const CustomSchemes = z.array(CustomScheme);

/*
z.object({
	dark: ColorVariables.partial(),
	light: ColorVariables.partial(),
})
.strict();
*/

export const MediaSchemes = z
	.object({
		default: RequiredMediaScheme.required(),
		schemes: z.array(MediaScheme),
	})
	.strict();
