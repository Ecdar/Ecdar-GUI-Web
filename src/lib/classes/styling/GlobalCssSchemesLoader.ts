import type ColorAttribute from "./ZodSchemas/AttributeSchemas/ColorAttribute";
import { ColorVariablesPartial } from "./ZodSchemas/CSSVariables";
import { type MediaScheme, CustomScheme } from "./ZodSchemas/MediaScheme";
import { MediaSchemes, CustomSchemes } from "./ZodSchemas/MediaSchemes";

import GlobalCssProperties from "../../GlobalCssProperties.json";

import { get, set, update } from "idb-keyval";
import { z } from "zod";

export type ConvertedValue = {
	variable: string;
	gamut: string;
	values: number[];
};

/**
 * Class for handling the loading of different properties based on active media features
 */
class GlobalCssSchemesLoader {
	private _mediaSchemes: z.infer<typeof MediaSchemes> | undefined;
	private _propertyNames: string[] = [];
	private readonly _idbKey = "customCssProperties";

	/**
	 * Initializes the GlobalCssSchemesLoader by parsing and applying the different properties,
	 * adding event listeners to supported features, and loading custom schemes.
	 * @throws If the CSS loader does not have access to the window and DOM elements.
	 */
	init() {
		if (!("window" in globalThis)) {
			throw new Error(
				"The CSS loader needs access to the window and DOM elements",
			);
		}

		// Parse and apply the different properties
		this._mediaSchemes = this.parseMediaFeatures();
		this.applySchemes();

		// Add event listeners to supported features
		this.addEventListeners();

		this.loadCustomSchemes();
	}

	/**
	 * Loads custom CSS schemes.
	 */
	async loadCustomSchemes() {
		const customSchemes = await this.checkCustomSchemes();
		this.applyCustomSchemes(customSchemes);
	}

	/**
	 * Checks if custom schemes exist and returns the parsed result.
	 * If custom schemes do not exist, creates new custom schemes and returns them.
	 * @returns A promise that resolves to the parsed result of the custom schemes.
	 */
	async checkCustomSchemes(): Promise<z.infer<typeof CustomSchemes>> {
		const result = await get(this._idbKey);
		const parsedResult = CustomSchemes.safeParse(result);

		if (parsedResult.success) return parsedResult.data;

		// If there is no data or data is malformed, reset
		const newCustomScheme = this.parseEmptyCustomScheme();

		await set(this._idbKey, newCustomScheme);

		return newCustomScheme;
	}

	/**
	 * Applies custom CSS schemes based on the provided media schemes.
	 * @param customSchemes - The array of custom media schemes.
	 */
	applyCustomSchemes(customSchemes: z.infer<typeof CustomSchemes>) {
		customSchemes.forEach((scheme) => {
			if (window.matchMedia(`(${scheme.mediaFeature})`).matches) {
				this.applyCssVariables(scheme);
			}
		});
	}

	/**
	 * Adds a custom variable to the GlobalCssSchemesLoader.
	 * @param mediaFeature The media feature for which the custom variable is defined.
	 * @param attribute The attribute representing the custom variable.
	 * @returns The updated array of custom schemes.
	 */
	async addCustomColor(
		mediaFeature: string,
		attribute: z.infer<typeof ColorVariablesPartial>,
	) {
		await update(this._idbKey, (customSchemes) => {
			const parsedSchemes = CustomSchemes.safeParse(customSchemes);
			const parsedAttribute = ColorVariablesPartial.safeParse(attribute);

			// Early return if the stored object does not parse
			if (!parsedAttribute.success || !parsedSchemes.success)
				return customSchemes; // TODO: This should result in a popup

			// Finding the index of the specific media feature if it already exists
			const index = parsedSchemes.data.findIndex(
				(scheme) => scheme.mediaFeature === mediaFeature,
			);

			// Creating a new media feature if it does not already exist and returns the updated object
			if (index === -1) {
				parsedSchemes.data.push(
					CustomScheme.parse({
						mediaFeature,
						color: parsedAttribute.data,
					}),
				);

				return parsedSchemes.data;
			}

			// Add or redefine the specified color variable
			for (const [key, val] of Object.entries(parsedAttribute.data)) {
				parsedSchemes.data[index].color[
					key as keyof z.infer<typeof ColorVariablesPartial>
				] = val;
			}

			return parsedSchemes.data;
		});

		this.reapplyMediaFeatures();
	}

	/**
	 * Delete a custom color from a media feature by attribute key
	 */
	async deleteCustomColor(
		mediaFeature: string,
		attributeKey: keyof z.infer<typeof ColorVariablesPartial>,
	) {
		await update(this._idbKey, (customSchemes) => {
			const parsedSchemes = CustomSchemes.safeParse(customSchemes);

			// Early return if the stored object does not parse
			if (!parsedSchemes.success) return customSchemes; // TODO: This should result in a popup

			// Finding the index of the specific media feature if it already exists
			const index = parsedSchemes.data.findIndex(
				(scheme) => scheme.mediaFeature === mediaFeature,
			);

			if (index === -1) return parsedSchemes;

			// Delete the specified color variable
			delete parsedSchemes.data[index].color[attributeKey];

			return parsedSchemes.data;
		});

		this.reapplyMediaFeatures();
	}

	/**
	 * Parse an empty custom scheme
	 */
	parseEmptyCustomScheme(): z.infer<typeof CustomSchemes> {
		return CustomSchemes.parse([
			{ mediaFeature: "prefers-color-scheme: dark" },
			{ mediaFeature: "prefers-color-scheme: light" },
		]);
	}

	/**
	 * Resets ALL custom colors
	 */
	async resetCustomColors() {
		await set(this._idbKey, this.parseEmptyCustomScheme());

		this.reapplyMediaFeatures();
	}

	/**
	 * Method for applying the specified styles
	 */
	applySchemes() {
		if (this._mediaSchemes === undefined) return;

		// Apply standard css variables
		this.applyCssVariables(this._mediaSchemes.default);

		// Apply each of the media features in the order in which they are specified in the .json file
		this._mediaSchemes.schemes.forEach((scheme) => {
			// Return early if the media feature does not match
			if (window.matchMedia(`(${scheme.mediaFeature})`).matches) {
				this.applyCssVariables(scheme);
			}
		});
	}

	/**
	 * Method for applying CSS variables for a specific media feature
	 * @param feature
	 */
	applyCssVariables(feature: z.infer<typeof MediaScheme>) {
		// Apply color variables
		if (feature.color) {
			for (const [key, val] of Object.entries(feature.color)) {
				this.setCssProperty(key, this.createCssColor(val));
			}
		}

		// Apply font size variables
		if (feature.fontSize) {
			for (const [key, val] of Object.entries(feature.fontSize)) {
				this.setCssProperty(key, val[0] + val[1]);
			}
		}

		// Apply font size variables
		if (feature.fontFamily) {
			for (const [key, val] of Object.entries(feature.fontFamily)) {
				this.setCssProperty(key, val[0]);
			}
		}

		// Apply border variables
		if (feature.border) {
			for (const [key, val] of Object.entries(feature.border)) {
				this.setCssProperty(
					key,
					this.createCssColor(val[2]) /* Border color */ +
						" " +
						val[0] /* Border style */ +
						" " +
						val[1][0] /* Border size */ +
						val[1][1] /* Border size unit */,
				);
			}
		}
	}

	/**
	 * Sets a CSS property on the root element of the document.
	 *
	 * @param key - The name of the CSS property.
	 * @param value - The value to set for the CSS property.
	 */
	private setCssProperty(key: string, value: string) {
		window.document.documentElement.style.setProperty(key, value);
		this._propertyNames.push(key);
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
		this.loadCustomSchemes();
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
		if (this._mediaSchemes === undefined) return;

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
	private createCssColor(color: z.infer<typeof ColorAttribute>): string {
		// Return CSS color string with alpha value
		if (color[4]) {
			return `color(${color[0]} ${color[1]} ${color[2]} ${color[3]} / ${color[4]})`;
		}

		return `color(${color[0]} ${color[1]} ${color[2]} ${color[3]})`;
	}

	/**
	 * Retrieves custom color variables based on the specified media feature.
	 * @param mediaFeature - The media feature to filter the custom color schemes.
	 * @returns A promise that resolves to an array of custom color variables.
	 */
	async getCustomColorVariables(
		mediaFeature: string,
	): Promise<ConvertedValue[]> {
		const customSchemes = await this.checkCustomSchemes();
		let convertedValues: ConvertedValue[];

		// Filters the custom schemes (Only returning the mathing schemes which is a single one)
		// Maps all of the defined color entries in that specific scheme
		convertedValues = customSchemes
			.filter((scheme) => scheme.mediaFeature === mediaFeature)
			.flatMap((scheme) =>
				Object.entries(scheme.color).map(([key, val]) => {
					const tempColors = [val[1], val[2], val[3]];
					if (val[4] !== undefined) tempColors.push(val[4]);

					return {
						variable: key,
						gamut: val[0],
						values: tempColors,
					};
				}),
			);

		return convertedValues;
	}

	/**
	 * Retrieves the keys of CSS variables from a given Zod schema.
	 *
	 * @param scheme - The Zod schema to extract CSS variable keys from.
	 * @returns An array of CSS variable keys.
	 */
	getCssVariableKeys<T extends z.ZodTypeAny>(scheme: T): string[] {
		if (scheme === null || scheme === undefined) return [];
		if (scheme instanceof z.ZodNullable || scheme instanceof z.ZodOptional)
			return this.getCssVariableKeys(scheme.unwrap());
		if (scheme instanceof z.ZodArray)
			return this.getCssVariableKeys(scheme.element);
		if (scheme instanceof z.ZodObject) {
			const entries = Object.entries(scheme.shape);
			return entries.flatMap(([key, value]) => {
				const nested =
					value instanceof z.ZodType
						? this.getCssVariableKeys(value).map(
								(subKey) => `${key}.${subKey}`,
						  )
						: [];
				return nested.length ? nested : key;
			});
		}

		return [];
	}
}

const shared: GlobalCssSchemesLoader = new GlobalCssSchemesLoader();
export default shared;
