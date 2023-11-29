/**
 * Document for specifying supported variables
 */
import { z } from "zod";
import ColorAttribute from "./AttributeSchemas/ColorAttribute";
import BorderAttribute from "./AttributeSchemas/BorderAttribute";
import FontAttribute from "./AttributeSchemas/FontAttribute";
import SizeValue from "./AttributeSchemas/SizeAttribute";

// Supported CSS color variables
export const ColorVariables = z
	.object({
		"--navigationbar-text-color": ColorAttribute,
		"--navigationbar-button-hover-color": ColorAttribute,
		"--console-scrollbar-thumb-color": ColorAttribute,
		"--console-selectedtab-color": ColorAttribute,
		"--console-unselectedtab-color": ColorAttribute,
		"--console-topbar-background-color": ColorAttribute,
		"--console-text-color": ColorAttribute,
		"--console-scrollbar-thumbhover-color": ColorAttribute,
		"--console-tab-hover-color": ColorAttribute,
		"--background-color": ColorAttribute,
		"--query-success-color": ColorAttribute,
		"--query-warning-color": ColorAttribute,
		"--query-error-color": ColorAttribute,
		"--queries-input-background-color": ColorAttribute,
		"--main-navigationbar-color": ColorAttribute,
		"--canvas-topbar-color": ColorAttribute,
		"--canvas-text-color": ColorAttribute,
		"--canvas-action-color": ColorAttribute,
		"--sidebar-text-color": ColorAttribute,
		"--sidebar-element-color": ColorAttribute,
		"--sidebar-element-hover-color": ColorAttribute,
		"--settings-danger-button-color": ColorAttribute,
		"--settings-safe-button-color": ColorAttribute,
	})
	.strict();

export const ColorVariablesPartial = ColorVariables.partial();

// Supported CSS font size variables
export const FontSizeVariables = z
	.object({
		"--sidebar-fontsize": SizeValue,
		"--sidebar-navigationbar-fontsize": SizeValue,
	})
	.strict();

// Supported CSS font family variables
export const FontFamilyVariables = z
	.object({
		"--font-family": FontAttribute,
	})
	.strict();

// Supported CSS border variables
export const BorderVariables = z
	.object({
		"--main-navigationbar-border": BorderAttribute,
		"--main-innernavigationbar-border": BorderAttribute,
	})
	.strict();
