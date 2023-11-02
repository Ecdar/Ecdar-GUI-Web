import { z } from "zod";
import MediaScheme from "./MediaScheme";

const MediaSchemes = z.object({
	default: MediaScheme,
	schemes: z.array(MediaScheme),
});

export default MediaSchemes;
