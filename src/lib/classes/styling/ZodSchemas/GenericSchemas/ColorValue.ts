import { z } from "zod";

/**
 * The values for the colors must be within the range of 0-1 as the implementation is based on the color() css function.
 * See information about the color function on: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color.
 * The alpha value is optional, and is also a number within the range 0-1.
 *
 * Example:
 * 		To represent the color "rgb(255 0 0)"" it is writen as "color(srgb 1 0 0)".
 * 		To convert the individual RGB values from the range 0-255 to the range 0-1 one simply has to use the following formula:
 * 			(old value)/255 = new value
 */

const ColorValue = z.object({
	colorGamut: z.string(),
	valueOne: z.number(),
	valueTwo: z.number(),
	valueThree: z.number(),
	alpha: z.number().optional(),
});

export default ColorValue;
