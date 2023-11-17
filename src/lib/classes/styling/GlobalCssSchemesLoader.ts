import type ColorValue from "./ZodSchemas/AttributeSchemas/ColorAttribute";
import type MediaScheme from "./ZodSchemas/MediaScheme";

import MediaSchemes from "./ZodSchemas/MediaSchemes";
import GlobalCssProperties from "../../GlobalCssProperties.json";

import type { z } from "zod";
import type TransitionAttribute from "./ZodSchemas/AttributeSchemas/TransitionAttribute";
import type NumberUnitAttribute from "./ZodSchemas/AttributeSchemas/NumberUnitAttribute";

/**
 * Class for handling the loading of different properties based on active media features
 */
class GlobalCssSchemesLoader {
	private _mediaSchemes: z.infer<typeof MediaSchemes>;
	private _propertyNames: string[] = [];

	constructor() {
		if (!("window" in globalThis))
			throw new Error(
				"The CSS loader needs access to the window and DOM elements",
			);

		// Parse and apply the different properties
		this._mediaSchemes = this.parseMediaFeatures();
		this.applySchemes();

		// Add event listeners to supported features
		this.addEventListeners();
	}

	/**
	 * Method for applying the specified styles
	 */
	applySchemes() {
		// Apply standard css variables
		this.applyCssVariables(this._mediaSchemes.default);

		// Apply each of the mediafeatures in the order in which they are specified in the .json file
		this._mediaSchemes.schemes.forEach((scheme) => {
			// Return early if the medie feature does not match
			if (window.matchMedia(`(${scheme.mediaFeature})`).matches) {
				this.applyCssVariables(scheme);
			}
		});
	}

	/**
	 * Method for applying CSS variabels for a specific mediafeature
	 * @param {z.infer<typeof MediaScheme>} feature
	 */
	applyCssVariables(feature: z.infer<typeof MediaScheme>) {
		// Apply color variables
		if (feature.color) {
			for (const [key, val] of Object.entries(feature.color)) {
				window.document.documentElement.style.setProperty(
					key,
					this.createCssColor(val),
				);
				this._propertyNames.push(key);
			}
		}

		// Apply font size variables
		if (feature.fontSize) {
			for (const [key, val] of Object.entries(feature.fontSize)) {
				window.document.documentElement.style.setProperty(
					key,
					val[0] + val[1], //TODO: Check the font size number
				);
				this._propertyNames.push(key);
			}
		}

		// Apply border variables
		if (feature.border) {
			for (const [key, val] of Object.entries(feature.border)) {
				window.document.documentElement.style.setProperty(
					key,
					this.createCssColor(val[2]) /* Border color */ +
						" " +
						val[0] /* Border style */ +
						" " +
						val[1][0] /* Border size */ +
						val[1][1] /* Border size unit */,
				);
				this._propertyNames.push(key);
			}
		}

		// Apply transition variables
		if (feature.transition) {
			for (const [key, val] of Object.entries(feature.transition)) {
				window.document.documentElement.style.setProperty(
					key,
					this.createTransition(val),
				);
				this._propertyNames.push(key);
			}
		}
	}

	/**
	 * Method for clearing the applied styles
	 */
	private clearAppliedProperties() {
		this._propertyNames.forEach((attribute) => {
			window.document.documentElement.style.removeProperty(attribute);
		});

		this._propertyNames = [];
	}

	/**
	 * Method for re-applying the specified styles
	 */
	reapplyMediaFeatures() {
		this.clearAppliedProperties();
		this.applySchemes();
	}

	/**
	 * Method for loading the GlobalCssProperties.json file
	 */
	private parseMediaFeatures(): z.infer<typeof MediaSchemes> {
		// Parsing media features
		const parsedMediaFeatures = MediaSchemes.safeParse(GlobalCssProperties);

		// Throwing error if the parsing failed
		if (!parsedMediaFeatures.success) {
			throw new TypeError(parsedMediaFeatures.error.message);
		}

		return parsedMediaFeatures.data;
	}

	/**
	 * Method for adding appropriate event listeners
	 */
	private addEventListeners() {
		this._mediaSchemes.schemes.forEach((scheme) => {
			window
				.matchMedia(`(${scheme.mediaFeature})`)
				.addEventListener("change", () => {
					this.reapplyMediaFeatures();
				});
		});
	}

	/**
	 * Method for checking and creating CSS color string
	 * @param color
	 * @returns CSS color string
	 */
	private createCssColor(color: z.infer<typeof ColorValue>): string {
		let cssColor: string;

		// Create CSS color string
		if (color[4]) {
			cssColor = `color(${color[0]} ${color[1]} ${color[2]} ${color[3]} / ${color[4]})`;
		} else {
			cssColor = `color(${color[0]} ${color[1]} ${color[2]} ${color[3]})`;
		}

		return cssColor;
	}

	/**
	 * Creates a CSS transition string based on the provided transition attribute.
	 * @param transition - The transition attribute to create the transition string from.
	 * @returns The CSS transition string.
	 */
	private createTransition(
		transition: z.infer<typeof TransitionAttribute>,
	): string {
		if (transition[0] === "none") return transition[0];

		let transitionString: string = transition[0];

		if (transition[1]) {
			transitionString += ` ${transition[1][0] + transition[1][1]}`;
		}
		if (transition[2]) {
			if (this.isNumberUnitAttribute(transition[2]))
				transitionString += ` ${transition[2]}`;
			else {
				transitionString += ` ${transition[2][0]}${transition[2][1]}`;
			}
		}
		if (transition[3]) {
			transitionString += ` ${transition[3][0] + transition[3][1]}`;
		}

		return transitionString;
	}

	/**
	 * Checks if the given input is a string or represents a number unit attribute.
	 * @param input - The input to check.
	 * @returns True if the input is a string, false otherwise.
	 */
	isNumberUnitAttribute(
		input: string | z.infer<typeof NumberUnitAttribute>,
	): input is string {
		return Boolean(typeof input === "string");
	}
}

export default GlobalCssSchemesLoader;
