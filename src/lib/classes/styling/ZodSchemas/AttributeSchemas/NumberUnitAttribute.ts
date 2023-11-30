import { z } from "zod";

/**
 * A size is represented using a number and a string.
 * Example: "3em" would be represented as "size: 3" and "unit: 'em'"
 */

const NumberUnitAttribute = z.tuple([
	z.number(), // The numerical size
	z.string(), // The unit of the size
]);

export default NumberUnitAttribute;
