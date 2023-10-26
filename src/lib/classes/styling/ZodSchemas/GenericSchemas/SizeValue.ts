import { z } from "zod";

/**
 * A size is represented using a number and a string.
 * Example: "3em" would be represented as "size: 3" and "unit: 'em'"
 */

const SizeValue = z.object({
	size: z.number(),
	unit: z.string(),
});

export default SizeValue;
