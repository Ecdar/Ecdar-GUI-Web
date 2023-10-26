import { z } from "zod";
import ColorValue from "../GenericSchemas/ColorValue";
import Size from "../GenericSchemas/SizeValue";

/**
 * Represents a border in CSS.
 * A border has a string containing the styles of the border, a width representing the thickness of the border and a color.
 */

const BorderAttribute = z.object({
	attributeName: z.string(),
	style: z.string(),
	width: Size,
	color: ColorValue,
});

export default BorderAttribute;
