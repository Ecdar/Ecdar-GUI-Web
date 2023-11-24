import { z } from "zod";
import {
	ColorVariables,
	FontSizeVariables,
	FontFamilyVariables,
	BorderVariables,
} from "./CSSVariables";

/**
 * A MediaScheme represents one of the many media queries.
 * The different attributes of the specific mediascheme are added if that specific media feature is currently active.
 *
 * A complete list of the different supported media queries can be seen on the following website:
 * 		https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries
 */

export const RequiredMediaScheme = z
	.object({
		mediaFeature: z.string(),
		color: ColorVariables.required(),
		fontSize: FontSizeVariables.required(),
		fontFamily: FontFamilyVariables.required(),
		border: BorderVariables.required(),
	})
	.strict();

export const MediaScheme = z
	.object({
		mediaFeature: z.string(),
		color: ColorVariables.partial().optional(),
		fontSize: FontSizeVariables.partial().optional(),
		fontFamily: FontFamilyVariables.partial().optional(),
		border: BorderVariables.partial().optional(),
	})
	.strict();

export const CustomScheme = z
	.object({
		mediaFeature: z.string(),
		color: ColorVariables.partial().default({}),
		fontSize: FontSizeVariables.partial().default({}),
		fontFamily: FontFamilyVariables.partial().default({}),
		border: BorderVariables.partial().default({}),
	})
	.strict();
