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

<select bind:value={selectedTheme} on:change={loadCustomizedColors}>
	{#each Object.entries(Theme) as [theme, value]}
		<option {value}>{theme}</option>
	{/each}
</select>
<select bind:value={selectedProperty}>
	{#each cssVariableKeys as key}
		{#if !customizedColors
			.map((convertedValue) => convertedValue.variable)
			.includes(key)}
			<option value={key}>{prettyProperty(key)}</option>
		{/if}
	{/each}
</select>

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
<input
	type="number"
	min="0"
	max="1"
	step="0.01"
	required
	bind:value={color[3]}
/>

<button
	disabled={selectedProperty === undefined || color.includes(null)}
	on:click={addCustomColor}>Add</button
>
<button on:click={resetCustomColors} style="background-color: red"
	>Reset All</button
>

{#each customizedColors as convertedValue}
	<div style="display: flex; justify-content: space-between;">
		<div>
			<p style="display: inline-block;">
				{prettyProperty(convertedValue.variable)}:
			</p>
		</div>
		<div style="display: flex; align-items: center">
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
				<input type="number" min="0" max="1" step="0.01" bind:value />
			{/each}
		</div>
	</div>

	<br />
{/each}
