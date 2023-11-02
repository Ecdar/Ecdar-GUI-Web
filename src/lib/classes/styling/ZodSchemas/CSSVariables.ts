/**
 * Document for specifying supported variables
 */
import { z } from "zod";
import ColorAttribute from "./AttributeSchemas/ColorAttribute";
import BorderAttribute from "./AttributeSchemas/BorderAttribute";
import SizeValue from "./AttributeSchemas/SizeAttribute";

// Supported CSS color variables
export const ColorVariables = z.object({
	"--navigationbar-text-color": ColorAttribute.optional(),
	"--console-scrollbar-thumb-color": ColorAttribute.optional(),
	"--console-scrollbar-thumbhover-color": ColorAttribute.optional(),
	"--query-success-color": ColorAttribute.optional(),
	"--query-warning-color": ColorAttribute.optional(),
	"--query-error-color": ColorAttribute.optional(),
	"--main-navigationbar-color": ColorAttribute.optional(),
	"--canvas-topbar-color": ColorAttribute.optional(),
	"--canvas-text-color": ColorAttribute.optional(),
	"--sidebar-text-color": ColorAttribute.optional(),
	"--background-color": ColorAttribute.optional(),
	"--console-selectedtab-color": ColorAttribute.optional(),
	"--console-unselectedtab-color": ColorAttribute.optional(),
	"--console-topbar-background-color": ColorAttribute.optional(),
	"--console-text-color": ColorAttribute.optional(),
	"--sidebar-element-color": ColorAttribute.optional(),
	"--sidebar-element-hover-color": ColorAttribute.optional(),
	"--queries-input-background-color": ColorAttribute.optional(),
	"--canvas-action-color": ColorAttribute.optional(),
	"--console-tab-hover-color": ColorAttribute.optional(),
});

// Supported CSS font size variables
export const FontSizeVariables = z.object({
	"--sidebar-fontsize": SizeValue.optional(),
	"--sidebar-navigationbar-fontsize": SizeValue.optional(),
});

// Supported CSS border variables
export const BorderVariables = z.object({
	"--main-navigationbar-border": BorderAttribute.optional(),
	"--main-innernavigationbar-border": BorderAttribute.optional(),
});
