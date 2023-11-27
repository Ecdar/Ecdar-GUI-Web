<script lang="ts">
  import type { z } from "zod";
  import GlobalFontLoader from "$lib/classes/styling/GlobalFontLoader";
  import GlobalCssSchemesLoader from "$lib/classes/styling/GlobalCssSchemesLoader";
  import type { ConvertedValue } from "$lib/classes/styling/GlobalCssSchemesLoader";
  import {
    ColorVariables,
    ColorVariablesPartial,
  } from "$lib/classes/styling/ZodSchemas/CSSVariables";
  import { onMount } from "svelte";

  enum SettingTab {
    ColorScheme,
    Font,
  }

  enum Theme {
    "Dark" = "prefers-color-scheme: dark",
    "Light" = "prefers-color-scheme: light",
  }

  let color: (number | null)[] = [null, null, null, 1];
  let selectedTheme: Theme = Theme.Dark;
  let customizedColors: ConvertedValue[] = [];
  let selectedProperty: keyof z.infer<typeof ColorVariablesPartial>;
  let cssVariableKeys: string[] = GlobalCssSchemesLoader.getCssVariableKeys(
    ColorVariablesPartial,
  );
  let selectedTab: SettingTab = SettingTab.ColorScheme;

  // Add a custom color
  function addCustomColor() {
    GlobalCssSchemesLoader.addCustomColor(
      selectedTheme,
      ColorVariablesPartial.parse({
        [selectedProperty]: ["display-p3", ...color],
      }),
    );

    loadCustomizedColors();
  }

  // Updates existing custom color
  function updateCustomColor(convertedValue: ConvertedValue) {
    GlobalCssSchemesLoader.addCustomColor(
      selectedTheme,
      ColorVariablesPartial.parse({
        [convertedValue.variable]: ["display-p3", ...convertedValue.values],
      }),
    );

    loadCustomizedColors();
  }

  // Delete a custom color
  function deleteCustomColor(convertedValue: ConvertedValue) {
    GlobalCssSchemesLoader.deleteCustomColor(
      selectedTheme,
      convertedValue.variable as keyof z.infer<typeof ColorVariables>,
    );

    loadCustomizedColors();
  }

  // Reset ALL custom colors
  function resetCustomColors() {
    if (confirm("Are you sure that you want to reset ALL custom colors?")) {
      GlobalCssSchemesLoader.resetCustomColors();
    }

    loadCustomizedColors();
  }

  // Turns '--background-color' into 'Background Color'
  function prettyProperty(property: string): string {
    return property
      .replace(/^--/, "") // Replaces first two dashes with nothing '--' => ''
      .replace(/-/g, " ") // Replaces remaining dashes with a space '-' => ' '
      .replace(/\b\w/g, (character) => character.toUpperCase()); // Capitalises first letter of each word
  }

  // Load Custom Color Variables
  async function loadCustomizedColors() {
    customizedColors =
      await GlobalCssSchemesLoader.getCustomColorVariables(selectedTheme);
    cssVariableKeys = GlobalCssSchemesLoader.getCssVariableKeys(ColorVariables);

    // Setting selectedProperty to the next possible css variable
    selectedProperty = cssVariableKeys.find(
      (property) =>
        !customizedColors.some(
          (convertedValue) => convertedValue.variable === property,
        ),
    ) as keyof z.infer<typeof ColorVariablesPartial>;
  }

  function handleFontUpload(event: Event) {
    const target = event.target as HTMLInputElement;

    if (target.files) {
      GlobalFontLoader.uploadCustomFont(target.files[0]);
    }
  }

  onMount(() => {
    loadCustomizedColors();

    // Initialize the component with the current colorscheme
    Object.entries(Theme).forEach(([_, theme]) => {
      if (window.matchMedia(`(${theme})`).matches) {
        selectedTheme = theme;
      }
    });
  });
</script>

<button on:click={() => (selectedTab = SettingTab.ColorScheme)}
  >Color Scheme</button
>
<button on:click={() => (selectedTab = SettingTab.Font)}>Font</button>

<br />
<hr />

{#if selectedTab === SettingTab.ColorScheme}
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
        <button on:click={() => updateCustomColor(convertedValue)}
          >Update</button
        >
        <button on:click={() => deleteCustomColor(convertedValue)}
          >Delete</button
        >

        {#each convertedValue.values as value}
          <input type="number" min="0" max="1" step="0.01" bind:value />
        {/each}
      </div>
    </div>

    <br />
  {/each}
{:else}
  <input
    on:change={handleFontUpload}
    type="file"
    id="fontInput"
    accept=".ttf, .otf"
  />
{/if}
