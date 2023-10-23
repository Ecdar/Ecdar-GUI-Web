import { z } from "zod";
import SizeValue from "../GenericSchemas/SizeValue";

const FontSizeAttribute = z.object({
	attributeName: z.string(),
	size: SizeValue,
});

export default FontSizeAttribute;
