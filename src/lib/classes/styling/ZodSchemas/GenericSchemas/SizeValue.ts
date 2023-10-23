import { z } from "zod";

const SizeValue = z.object({
	size: z.number(),
	unit: z.string(),
});

export default SizeValue;
