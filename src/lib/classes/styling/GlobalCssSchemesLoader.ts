import type ColorValue from "./ZodSchemas/AttributeSchemas/ColorAttribute";
import type MediaScheme from "./ZodSchemas/MediaScheme";

import MediaSchemes from "./ZodSchemas/MediaSchemes";
import GlobalCssProperties from "../../GlobalCssProperties.json";

import type { z } from "zod";

/**
 * Class for handling the loading of different properties based on active media features
 */
class GlobalCssSchemesLoader {
	private _window: Window;
	private _mediaSchemes: z.infer<typeof MediaSchemes>;
	private _propertyNames: string[] = [];

	constructor(window: Window) {
		this._window = window;

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
			if (this._window.matchMedia(`(${scheme.mediaFeature})`).matches) {
				this.applyCssVariables(scheme);
			}
		});
	}

	/**
	 * Method for applying CSS variabels for a specific mediafeature
	 * @param feature
	 */
	applyCssVariables(feature: z.infer<typeof MediaScheme>) {
		// Apply color variables
		if (feature.color) {
			for (const [key, val] of Object.entries(feature.color)) {
				this._window.document.documentElement.style.setProperty(
					key,
					this.createCssColor(val),
				);
				this._propertyNames.push(key);
			}
		}

		// Apply font size variables
		if (feature.fontSize) {
			for (const [key, val] of Object.entries(feature.fontSize)) {
				this._window.document.documentElement.style.setProperty(
					key,
					val[0] + val[1], //TODO: Check the font size number
				);
				this._propertyNames.push(key);
			}
		}

		// Apply border variables
		if (feature.border) {
			for (const [key, val] of Object.entries(feature.border)) {
				this._window.document.documentElement.style.setProperty(
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
	}

	/**
	 * Method for clearing the applied styles
	 */
	private clearAppliedProperties() {
		this._propertyNames.forEach((attribute) => {
			this._window.document.documentElement.style.removeProperty(
				attribute,
			);
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
			this._window
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
		const supportedGamuts: string[] = [
			"srgb",
			"srgb-linear",
			"display-p3",
			"a98-rgb",
			"prophoto-rgb",
			"rec2020",
			"xyz",
			"xyz-d50",
			"xyz-d65",
		];
		let cssColor: string;

		// Check if color gamut is supported
		if (!supportedGamuts.includes(color[0])) {
			throw new Error(
				`Color gamut "${color[0]}" specified in parsed global css styles, is not supported."`,
			);
		}

		// Check if values are within range (0.0 - 1.0)
		if (
			this.outOfColorRange(color[1]) ||
			this.outOfColorRange(color[2]) ||
			this.outOfColorRange(color[3]) ||
			(color[4] && this.outOfColorRange(color[4]))
		) {
			throw new Error(
				"Color value in parsed global css styles out of range (0.0 - 1.0).",
			);
		}

		// Create CSS color string
		if (color[4]) {
			cssColor = `color(${color[0]} ${color[1]} ${color[2]} ${color[3]} / ${color[4]})`;
		} else {
			cssColor = `color(${color[0]} ${color[1]} ${color[2]} ${color[3]})`;
		}

		return cssColor;
	}

	/**
	 * Support method for checking if color is within range
	 * @param value
	 * @returns Boolean value representing if value is out of range
	 */
	private outOfColorRange(value: number): boolean {
		return value > 1 || value < 0;
	}
}

export default GlobalCssSchemesLoader;