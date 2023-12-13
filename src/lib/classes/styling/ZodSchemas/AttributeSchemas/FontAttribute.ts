import { z } from "zod";

/**
 * A font family is represented using a name.
 */

const FontAttribute = z.tuple([
	z.string(), // The name of the font family
]);

export default FontAttribute;
