import { z } from "zod";
import ColorValue from "../GenericSchemas/ColorValue";

const ColorAttribute = z.object({
	attributeName: z.string(),
	color: ColorValue,
});

export default ColorAttribute;
