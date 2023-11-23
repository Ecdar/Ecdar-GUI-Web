import { z } from "zod";
import ColorAttribute from "./ColorAttribute";
import NumberUnitAttribute from "./NumberUnitAttribute";

/**
 * Represents a border in CSS.
 * A border has a string containing the styles of the border, a width representing the thickness of the border and a color.
 */

const BorderAttribute = z.tuple([
	z.string(), // Border style string
	NumberUnitAttribute, // Thickness of the border
	ColorAttribute, // The color of the border
]);

export default BorderAttribute;
