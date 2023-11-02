import { z } from "zod";
import MediaScheme, { RequiredMediaScheme } from "./MediaScheme";

const MediaSchemes = z
	.object({
		default: RequiredMediaScheme.required(),
		schemes: z.array(MediaScheme),
	})
	.strict();
export default MediaSchemes;
