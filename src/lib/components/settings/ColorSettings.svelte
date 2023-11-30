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
	let selectedTheme: Theme;
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
				[selectedProperty]: ["srgb", ...color],
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
				[convertedValue.variable]: ["srgb", ...convertedValue.values],
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
	 * Converts a hex color to the color range 0-1
	 * @param hex - The hex color to convert.
	 * @returns The converted color.
	 */
	function hexToCorrectColorRange(hex: string): number[] {
		const toRoundedColorRange = (value: string) => {
			return Number((parseInt(value, 16) / 255).toFixed(4));
		};

		return [
			toRoundedColorRange(hex.slice(1, 3)),
			toRoundedColorRange(hex.slice(3, 5)),
			toRoundedColorRange(hex.slice(5, 7)),
			1,
		];
	}

	/**
	 * Converts a color within the range 0-1 to hex.
	 * @param color - The color to convert.
	 * @returns The converted color.
	 */
	function correctColorRangeToHex(color: (number | null)[]): string {
		const toHex = (value: number | null) => {
			if (value === null || value < 0) return "00";
			if (value > 255) return "FF";

			const hex = Math.round(value * 255).toString(16);

			return hex.length === 1 ? "0" + hex : hex;
		};

		return "#" + color.slice(0, 3).map(toHex).join("");
	}

	/**
	 * Updates the lists input colors to preview the color from the input picker.
	 * @param event - The event object.
	 * @param index - The index of the color in the list to update.
	 */
	function previewListColorPicker(event: Event, index: number) {
		customizedColors[index].values = hexToCorrectColorRange(
			(event.target as HTMLInputElement).value,
		);
	}

	/**
	 * Updates the top input colors to preview the color from the input picker.
	 * @param event - The event object.
	 */
	function previewTopColorPicker(event: Event) {
		color = hexToCorrectColorRange(
			(event.target as HTMLInputElement).value,
		);
	}

	onMount(() => {
		// Initialize the component with the current colorscheme
		Object.entries(Theme).forEach(([, theme]) => {
			if (window.matchMedia(`(${theme})`).matches) {
				selectedTheme = theme;
			}
		});

		loadCustomizedColors().catch(writeLoadError);
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
			<select class="fixed-width" bind:value={selectedProperty}>
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
					placeholder="0 to 1"
					min="0"
					max="1"
					step="0.0001"
					required
					bind:value={color[index]}
				/>
			{/each}
		</div>
		<div>
			<p>Alpha</p>
			<input
				type="number"
				placeholder="0 to 1"
				min="0"
				max="1"
				step="0.0001"
				required
				bind:value={color[3]}
			/>
		</div>
		<div class="top-picker">
			<p>Picker</p>
			<input
				type="color"
				value={correctColorRangeToHex(color)}
				on:input={(event) => {
					previewTopColorPicker(event);
				}}
			/>
		</div>

		<div>
			<button
				class="add"
				disabled={selectedProperty === undefined ||
					color.includes(null) ||
					color.some((e) => e === null || e < 0 || e > 1)}
				on:click={addCustomColor}>Add</button
			>
		</div>
	</div>
	<div>
		<button class="delete" on:click={resetCustomColors}
			>Reset All Colors</button
		>
	</div>
</div>

<hr />

<div class="bottom">
	{#each customizedColors as convertedValue, index}
		<div class="custom-color">
			<div>
				<h3>
					{prettyProperty(convertedValue.variable)}:
				</h3>
			</div>
			<div class="custom-color-options">
				<div>
					{#each convertedValue.values as value, index}
						{#if index < 3}
							<input
								type="number"
								placeholder="0 to 1"
								min="0"
								max="1"
								step="0.0001"
								required
								bind:value
							/>
						{/if}
					{/each}
				</div>
				<div>
					<input
						type="number"
						placeholder="0 to 1"
						min="0"
						max="1"
						step="0.0001"
						required
						bind:value={convertedValue.values[3]}
					/>
				</div>
				<div>
					<input
						type="color"
						value={correctColorRangeToHex(convertedValue.values)}
						on:input={(event) => {
							previewListColorPicker(event, index);
						}}
					/>
				</div>
				<div>
					<button
						class="add"
						disabled={convertedValue.values.some(
							(e) => typeof e !== "number" || e < 0 || e > 1,
						)}
						on:click={() => {
							updateCustomColor(convertedValue);
						}}>Update</button
					>
				</div>
				<div>
					<button
						class="delete"
						on:click={() => {
							if (
								confirm(
									"Are you sure that you want to delete this custom color?",
								)
							) {
								deleteCustomColor(convertedValue);
							}
						}}>Delete</button
					>
				</div>
			</div>
		</div>

		<br />
	{/each}
</div>

<style>
	p {
		margin-top: 0;
		margin-bottom: 0.5em;
	}

	h3 {
		margin: 0;
	}

	select {
		-webkit-appearance: menulist-button;
		appearance: menulist-button;
		line-height: 2.5em;
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

	input:invalid {
		outline: 1px solid red;
	}

	button {
		color: var(--navigationbar-text-color);
		border: none;
		padding: 0.5em 1em;
		transition: background-color 200ms;
	}

	hr {
		margin: 0;
		height: 0.2em;
		border: none;
		background-color: black;
	}

	button[disabled] {
		filter: opacity(0.5);
	}

	.add {
		background-color: var(--settings-safe-button-color);
	}

	.add:hover {
		filter: brightness(1.2);
	}

	.delete {
		background-color: var(--settings-danger-button-color);
	}

	.delete:hover {
		filter: brightness(1.2);
	}

	.top {
		display: flex;
		justify-content: space-between;
	}

	.fixed-width {
		width: 15em;
	}

	.top-picker {
		display: flex;
		flex-direction: column;
	}

	.top {
		margin: 1em;
	}

	.left-top {
		display: flex;
		align-items: flex-end;
	}

	.left-top div {
		margin: 0.25em;
	}

	.bottom {
		margin: 1em 1em 0 1em;
		overflow-y: auto;
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

	.custom-color-options div {
		margin: 0.25em;
	}
</style>
