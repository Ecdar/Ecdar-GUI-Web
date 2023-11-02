import { z } from "zod";
import {
	ColorVariables,
	FontSizeVariables,
	BorderVariables,
} from "./CSSVariables";

/**
 * A MediaScheme represents one of the many media queries.
 * The different attributes of the specific mediascheme are added if that specific media feature is currently active.
 *
 * A complete list of the different supported media queries can be seen on the following website:
 * 		https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries
 */

const MediaScheme = z.object({
	mediaFeature: z.string(),
	color: ColorVariables.optional(),
	fontSize: FontSizeVariables.optional(),
	border: BorderVariables.optional(),
});

export default MediaScheme;
