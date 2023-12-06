/**
 * Document for specifying supported variables
 */
import { z } from "zod";
import ColorAttribute from "./AttributeSchemas/ColorAttribute";
import BorderAttribute from "./AttributeSchemas/BorderAttribute";
import FontAttribute from "./AttributeSchemas/FontAttribute";
import TransitionAttribute from "./AttributeSchemas/TransitionAttribute";
import NumberUnitAttribute from "./AttributeSchemas/NumberUnitAttribute";

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
		"--text-color": ColorAttribute,
		"--text-secondary-color": ColorAttribute,
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
		"--editor-keyword-color": ColorAttribute,
		"--settings-danger-button-color": ColorAttribute,
		"--settings-safe-button-color": ColorAttribute,
	})
	.strict();

export const ColorVariablesPartial = ColorVariables.partial();

// Supported CSS font size variables
export const FontSizeVariables = z
	.object({
		"--sidebar-fontsize": NumberUnitAttribute,
		"--sidebar-navigationbar-fontsize": NumberUnitAttribute,
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

export const TransitionVariables = z
	.object({
		"--console-tab-hover-transition": TransitionAttribute,
		"--console-height-transition": TransitionAttribute,
		"--sidebar-element-transition": TransitionAttribute,
		"--settings-filter-transition": TransitionAttribute,
		"--settings-background-color-transition": TransitionAttribute,
		"--tabs-background-color-transition": TransitionAttribute,
		"--svgbutton-background-color-transition": TransitionAttribute,
	})
	.strict();
