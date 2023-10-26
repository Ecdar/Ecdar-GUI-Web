import type ColorValue from "./ZodSchemas/GenericSchemas/ColorValue";
import type MediaScheme from "./ZodSchemas/MediaScheme";

import MediaSchemes from "./ZodSchemas/MediaSchemes";
import GlobalCssProperties from "../../GlobalCssProperties.json";

import type { z } from "zod";

/**
 * Class for handling the loading of different properties based on active media features
 */
class GlobalCssSchemesLoader {
	private _window: Window;
	private _mediaSchemes: z.infer<typeof MediaScheme>[];
	private _propertyNames: string[] = [];

	// SUPPORTED MEDIA FEATURES
	private _supportedMediaFeatures: string[] = [
		"prefers-color-scheme: dark",
		"prefers-color-scheme: light",
		"prefers-reduced-motion",
		"prefers-reduced-transparency",
	];

	constructor(window: Window) {
		this._window = window;

		// Parse and apply the different properties
		this._mediaSchemes = this.parseMediaFeatures();
		this.applyMediaFeatures();

		// Add event listeners to supported features
		this.addEventListeners();

		// Gather the property names
		this.gatherPropertyNames();
	}

	/**
	 * Method for applying the specified styles
	 */
	applyMediaFeatures() {
		// Apply each of the mediafeatures in the order in which they are specified in the .json file
		this._mediaSchemes.forEach((scheme) => {
			// Return early if the medie feature does not match
			if (
				!this._window.matchMedia(`(${scheme.mediaFeature})`).matches &&
				scheme.mediaFeature !== "standard"
			) {
				return;
			}

			// Set color properties
			if (scheme.color) {
				scheme.color.forEach((attribute) => {
					this._window.document.documentElement.style.setProperty(
						attribute.attributeName,
						this.createCssColor(attribute.color),
					);
				});
			}

			// Set fontSize properties
			if (scheme.fontSize) {
				scheme.fontSize.forEach((attribute) => {
					this._window.document.documentElement.style.setProperty(
						attribute.attributeName,
						attribute.size.size + attribute.size.unit, //TODO: Check the font size number
					);
				});
			}

			// Set border properties
			if (scheme.border) {
				scheme.border.forEach((attribute) => {
					this._window.document.documentElement.style.setProperty(
						attribute.attributeName,
						this.createCssColor(attribute.color) +
							" " +
							attribute.style +
							" " +
							attribute.width.size +
							attribute.width.unit,
					);
				});
			}
		});
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
	}

	/**
	 * Method for re-applying the specified styles
	 */
	reapplyMediaFeatures() {
		this.clearAppliedProperties();
		this.applyMediaFeatures();
	}

	/**
	 * Method that gathers all property names from the config to be able to remove them later
	 */
	gatherPropertyNames() {
		this._mediaSchemes.forEach((scheme) => {
			// Check and add color attribute names
			if (scheme.color) {
				scheme.color.forEach((attr) => {
					if (!this._propertyNames.includes(attr.attributeName)) {
						this._propertyNames.push(attr.attributeName);
					}
				});
			}

			// Check and add fontSize attribute names
			if (scheme.fontSize) {
				scheme.fontSize.forEach((attr) => {
					if (!this._propertyNames.includes(attr.attributeName)) {
						this._propertyNames.push(attr.attributeName);
					}
				});
			}

			// Check and add border attribute names
			if (scheme.border) {
				scheme.border.forEach((attr) => {
					if (!this._propertyNames.includes(attr.attributeName)) {
						this._propertyNames.push(attr.attributeName);
					}
				});
			}
		});
	}

	/**
	 * Method for loading the ColorSchemes.json file
	 */
	private parseMediaFeatures(): z.infer<typeof MediaScheme>[] {
		// Parsing media features
		const parsedMediaFeatures = MediaSchemes.safeParse(GlobalCssProperties);

		// Throwing error if the parsing failed
		if (!parsedMediaFeatures.success) {
			throw new Error(parsedMediaFeatures.error.message);
		}

		return parsedMediaFeatures.data.mediaSchemes;
	}

	/**
	 * Method for adding appropriate event listeners
	 */
	private addEventListeners() {
		this._supportedMediaFeatures.forEach((feature) => {
			this._window
				.matchMedia(`(${feature})`)
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
		if (!supportedGamuts.includes(color.colorGamut)) {
			throw new Error(
				`Color gamut "${color.colorGamut}" specified in parsed global css styles, is not supported."`,
			);
		}

		// Check if values are within range (0.0 - 1.0)
		if (
			this.outOfColorRange(color.valueOne) ||
			this.outOfColorRange(color.valueTwo) ||
			this.outOfColorRange(color.valueThree) ||
			(color.alpha && this.outOfColorRange(color.alpha))
		) {
			throw new Error(
				"Color value in parsed global css styles out of range (0.0 - 1.0).",
			);
		}

		// Create CSS color string
		if (color.alpha) {
			cssColor = `color(${color.colorGamut} ${color.valueOne} ${color.valueTwo} ${color.valueThree} / ${color.alpha})`;
		} else {
			cssColor = `color(${color.colorGamut} ${color.valueOne} ${color.valueTwo} ${color.valueThree})`;
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
