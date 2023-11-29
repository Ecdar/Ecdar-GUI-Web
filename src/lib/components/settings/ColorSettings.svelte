<script lang="ts">
	import type { z } from "zod";
	import type { ConvertedValue } from "$lib/classes/styling/GlobalCssSchemesLoader";
	import GlobalCssSchemesLoader from "$lib/classes/styling/GlobalCssSchemesLoader";
	import Console from "$lib/classes/console/Console";
	import { onMount } from "svelte";

	import {
		ColorVariables,
		ColorVariablesPartial,
	} from "$lib/classes/styling/ZodSchemas/CSSVariables";

	/**
	 * Enum representing different themes for the color settings.
	 * @enum Theme
	 */
	enum Theme {
		"Dark" = "prefers-color-scheme: dark",
		"Light" = "prefers-color-scheme: light",
	}

	let color: (number | null)[] = [null, null, null, 1];
	let selectedTheme: Theme = Theme.Dark;
	let customizedColors: ConvertedValue[] = [];
	let selectedProperty:
		| keyof z.infer<typeof ColorVariablesPartial>
		| undefined;
	let cssVariableKeys: string[] = GlobalCssSchemesLoader.getCssVariableKeys(
		ColorVariablesPartial,
	);

	/**
	 * Adds a custom color.
	 */
	function addCustomColor() {
		if (selectedProperty === undefined) return;

		GlobalCssSchemesLoader.addCustomColor(
			selectedTheme,
			ColorVariablesPartial.parse({
				[selectedProperty]: ["display-p3", ...color],
			}),
		).catch((error: Error) => {
			Console.writeLineFrontend(
				`Failed to add custom color: ${error.message}`,
			);
		});

		loadCustomizedColors().catch(writeLoadError);
	}

	/**
	 * Updates the custom color based on the converted value.
	 * @param convertedValue - The converted value to update the custom color.
	 */
	function updateCustomColor(convertedValue: ConvertedValue) {
		GlobalCssSchemesLoader.addCustomColor(
			selectedTheme,
			ColorVariablesPartial.parse({
				[convertedValue.variable]: [
					"display-p3",
					...convertedValue.values,
				],
			}),
		).catch((error: Error) => {
			Console.writeLineFrontend(
				`Failed to update custom color: ${error.message}`,
			);
		});

		loadCustomizedColors().catch(writeLoadError);
	}

	/**
	 * Deletes a custom color.
	 * @param convertedValue - The converted value to be deleted.
	 */
	function deleteCustomColor(convertedValue: ConvertedValue) {
		GlobalCssSchemesLoader.deleteCustomColor(
			selectedTheme,
			convertedValue.variable as keyof z.infer<typeof ColorVariables>,
		).catch((error: Error) => {
			Console.writeLineFrontend(
				`Failed to delete custom color: ${error.message}`,
			);
		});

		loadCustomizedColors().catch(writeLoadError);
	}

	/**
	 * Resets the custom colors to their default values.
	 */
	function resetCustomColors() {
		if (confirm("Are you sure that you want to reset ALL custom colors?")) {
			GlobalCssSchemesLoader.resetCustomColors()
				.then(async () => {
					await loadCustomizedColors();
				})
				.catch((error: Error) => {
					Console.writeLineFrontend(
						`Failed to reset and reload custom colors: ${error.message}`,
					);
				});
		}
	}

	/**
	 * Turns '--background-color' into 'Background Color'
	 *
	 * @param property - The property to make pretty.
	 * @returns The pretty version of the property.
	 */
	function prettyProperty(property: string): string {
		return property
			.replace(/^--/, "") // Replaces first two dashes with nothing '--' => ''
			.replace(/-/g, " ") // Replaces remaining dashes with a space '-' => ' '
			.replace(/\b\w/g, (character) => character.toUpperCase()); // Capitalises first letter of each word
	}

	/**
	 * Writes the load error to the console.
	 * @param error - The error object.
	 */
	function writeLoadError(error: Error) {
		Console.writeLineFrontend(
			`Failed to reset and reload custom colors: ${error.message}`,
		);
	}

	/**
	 * Load Custom Color Variables
	 * @returns void promise
	 */
	async function loadCustomizedColors() {
		customizedColors =
			await GlobalCssSchemesLoader.getCustomColorVariables(selectedTheme);
		cssVariableKeys = GlobalCssSchemesLoader.getCssVariableKeys(
			ColorVariablesPartial,
		);

		// Setting selectedProperty to the next possible css variable
		selectedProperty = cssVariableKeys.find(
			(property) =>
				!customizedColors.some(
					(convertedValue) => convertedValue.variable === property,
				),
		) as keyof z.infer<typeof ColorVariablesPartial>;
	}

	/**
	 * Converts a hex color to display-p3.
	 * @param hex - The hex color to convert.
	 * @returns The converted color.
	 */
	function hexToDisplayP3(hex: string): number[] {
		return [
			parseInt(hex.slice(1, 3), 16) / 255,
			parseInt(hex.slice(3, 5), 16) / 255,
			parseInt(hex.slice(5, 7), 16) / 255,
			1,
		];
	}

	/**
	 * Converts a display-p3 color to hex.
	 * @param displayP3 - The display-p3 color to convert.
	 * @returns The converted color.
	 */
	function displayP3ToHex(displayP3: number[]): string {
		const toHex = (value: number) => {
			const hex = Math.round(value * 255).toString(16);
			return hex.length === 1 ? "0" + hex : hex;
		};

		return "#" + displayP3.slice(0, 3).map(toHex).join("");
	}

	/**
	 * Updates the input color boxes to preview the color from the input picker.
	 * @param event - The event object.
	 * @param index - The index of the color in the list to update.
	 */
	function previewColorPicker(event: Event, index: number) {
		customizedColors[index].values = hexToDisplayP3(
			(event.target as HTMLInputElement).value,
		);
	}

	onMount(() => {
		loadCustomizedColors().catch(writeLoadError);

		// Initialize the component with the current colorscheme
		Object.entries(Theme).forEach(([, theme]) => {
			if (window.matchMedia(`(${theme})`).matches) {
				selectedTheme = theme;
			}
		});
	});
</script>

<div class="top">
	<div class="left-top">
		<div>
			<p>Theme</p>
			<select bind:value={selectedTheme} on:change={loadCustomizedColors}>
				{#each Object.entries(Theme) as [theme, value]}
					<option {value}>{theme}</option>
				{/each}
			</select>
		</div>
		<div>
			<p>Property</p>
			<select bind:value={selectedProperty}>
				{#each cssVariableKeys as key}
					{#if !customizedColors
						.map((convertedValue) => convertedValue.variable)
						.includes(key)}
						<option value={key}>{prettyProperty(key)}</option>
					{/if}
				{/each}
			</select>
		</div>

		<div>
			<p>Color</p>
			{#each [0, 1, 2] as index}
				<input
					type="number"
					min="0"
					max="1"
					step="0.01"
					placeholder="1"
					required
					bind:value={color[index]}
				/>
			{/each}
		</div>
		<div>
			<p>Alpha</p>
			<input
				type="number"
				min="0"
				max="1"
				step="0.01"
				required
				bind:value={color[3]}
			/>
		</div>

		<div>
			<button
				disabled={selectedProperty === undefined ||
					color.includes(null)}
				on:click={addCustomColor}>Add</button
			>
		</div>
	</div>
	<div>
		<button class="reset" on:click={resetCustomColors}
			>Reset All Colors</button
		>
	</div>
</div>

<hr />

<div class="bottom">
	{#each customizedColors as convertedValue, index}
		<div class="custom-color">
			<div>
				<p>
					{prettyProperty(convertedValue.variable)}:
				</p>
			</div>
			<div class="custom-color-options">
				<button
					on:click={() => {
						updateCustomColor(convertedValue);
					}}>Update</button
				>
				<button
					on:click={() => {
						deleteCustomColor(convertedValue);
					}}>Delete</button
				>

				{#each convertedValue.values as value}
					<input
						type="number"
						min="0"
						max="1"
						step="0.01"
						bind:value
					/>
				{/each}
				<input
					type="color"
					value={displayP3ToHex(convertedValue.values)}
					on:input={(event) => previewColorPicker(event, index)}
				/>
			</div>
		</div>

		<br />
	{/each}
</div>

<style>
	p {
		margin-bottom: 0.5em;
	}

	select,
	input,
	button {
		height: 2.5em;
	}

	input[type="color"]::-moz-color-swatch {
		border: none;
	}

	input[type="color"]::-webkit-color-swatch-wrapper {
		padding: 0;
	}

	input[type="color"]::-webkit-color-swatch {
		border: none;
	}

	button {
		background-color: darkgreen;
		color: var(--navigationbar-text-color);
		border: none;
		padding: 0.5em 1em;
	}

	hr {
		margin: 0;
		height: 0.2em;
		border: none;
		background-color: black;
	}

	button[disabled],
	.reset {
		background-color: darkred;
	}

	.top {
		display: flex;
		justify-content: space-between;
	}

	.top,
	.bottom {
		margin: 1em;
	}

	.left-top {
		display: flex;
		align-items: flex-end;
	}

	.left-top div {
		margin: 0.25em;
	}

	.custom-color {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.custom-color-options {
		display: flex;
		align-items: center;
	}

	.custom-color-options * {
		margin: 0.25em;
	}
</style>
