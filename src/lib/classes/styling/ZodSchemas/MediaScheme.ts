import { z } from "zod";
import ColorAttribute from "./AttributeSchemas/ColorAttribute";
import BorderAttribute from "./AttributeSchemas/BorderAttribute";
import FontSizeAttribute from "./AttributeSchemas/FontSizeAttribute";

/**
 * A MediaScheme represents one of the many media queries.
 * The different attributes of the specific mediascheme are added if that specific media feature is currently active.
 *
 * A complete list of the different supported media queries can be seen on the following website:
 * 		https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries
 */

const MediaScheme = z.object({
	mediaFeature: z.string(),
	color: z.array(ColorAttribute).optional(),
	fontSize: z.array(FontSizeAttribute).optional(),
	border: z.array(BorderAttribute).optional(),
});

export default MediaScheme;
