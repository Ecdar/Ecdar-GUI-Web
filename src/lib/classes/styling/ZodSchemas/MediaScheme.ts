import { z } from "zod";
import ColorAttribute from "./AttributeSchemas/ColorAttribute";
import BorderAttribute from "./AttributeSchemas/BorderAttribute";
import FontSizeAttribute from "./AttributeSchemas/FontSizeAttribute";

const MediaScheme = z.object({
	mediaFeature: z.string(),
	color: z.array(ColorAttribute).optional(),
	fontSize: z.array(FontSizeAttribute).optional(),
	border: z.array(BorderAttribute).optional(),
});

export default MediaScheme;
