import { z } from "zod";
import ColorValue from "../GenericSchemas/ColorValue";
import Size from "../GenericSchemas/SizeValue";

const BorderAttribute = z.object({
	attributeName: z.string(),
	style: z.string(),
	width: Size,
	color: ColorValue,
});

export default BorderAttribute;
