import { z } from "zod";

const ColorValue = z.object({
	colorGamut: z.string(),
	valueOne: z.number(),
	valueTwo: z.number(),
	valueThree: z.number(),
	alpha: z.number().optional(),
});

export default ColorValue;
