import { z } from "zod";
import {
	ColorVariables,
	FontSizeVariables,
	BorderVariables,
	TransitionVariables,
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
		border: BorderVariables.required(),
		transition: TransitionVariables.required(),
	})
	.strict();

const MediaScheme = z
	.object({
		mediaFeature: z.string(),
		color: ColorVariables.partial().optional(),
		fontSize: FontSizeVariables.partial().optional(),
		border: BorderVariables.partial().optional(),
		transition: TransitionVariables.partial().optional(),
	})
	.strict();

export default MediaScheme;
