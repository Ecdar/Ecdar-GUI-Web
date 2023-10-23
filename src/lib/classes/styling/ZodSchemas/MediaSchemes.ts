import { z } from "zod";
import MediaScheme from "./MediaScheme";

const MediaSchemes = z.object({
	mediaSchemes: z.array(MediaScheme),
});

export default MediaSchemes;
