<script lang="ts">
  import type { z } from "zod";
  import GlobalCssSchemesLoader from "$lib/classes/styling/GlobalCssSchemesLoader";
  import type { ConvertedValue } from "$lib/classes/styling/GlobalCssSchemesLoader";
  import {
    ColorVariables,
    ColorVariablesPartial,
  } from "$lib/classes/styling/ZodSchemas/CSSVariables";
  import { onMount } from "svelte";

  enum Themes {
    "Dark" = "prefers-color-scheme: dark",
    "Light" = "prefers-color-scheme: light",
  }

  let color: number[] = [];
  let selectedProperty: keyof z.infer<typeof ColorVariablesPartial>;
  let selectedTheme: Themes = Themes.Dark;
  let customizedColors: ConvertedValue[] = [];
  let includeAlpha: boolean = false;

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
    if (
      confirm(
        "Are you sure that you want to reset ALL custom colors? There is no undo yet, coming soon™.",
      )
    ) {
      GlobalCssSchemesLoader.resetCustomColors();
    }

    loadCustomizedColors();
  }

  // Turns '--background-color' into 'Background Color'
  function prettyProperty(property: string): string {
    return property
      .replace(/^--/, "")
      .replace(/-/g, " ")
      .replace(/\b\w/g, (character) => character.toUpperCase());
  }

  // Load Custom Color Variables
  async function loadCustomizedColors() {
    customizedColors =
      await GlobalCssSchemesLoader.getCustomColorVariables(selectedTheme);
  }

  onMount(() => {
    loadCustomizedColors();

    // Initialize the component with the current colorscheme
    Object.entries(Themes).forEach(([_, theme]) => {
      if (window.matchMedia(`(${theme})`).matches) {
        selectedTheme = theme;
      }
    });
  });
</script>

<select bind:value={selectedTheme} on:change={loadCustomizedColors}>
  {#each Object.entries(Themes) as [theme, value]}
    <option {value}>{theme}</option>
  {/each}
</select>
<select bind:value={selectedProperty}>
  {#each GlobalCssSchemesLoader.getCssVariableKeys(ColorVariables) as property}
    <option value={property}>{prettyProperty(property)}</option>
  {/each}
</select>

<input type="checkbox" bind:checked={includeAlpha} />
{#each includeAlpha ? [0, 1, 2, 3] : [0, 1, 2] as index}
  <input type="number" min="0" max="1" step="0.01" bind:value={color[index]} />
{/each}

<button on:click={addCustomColor}>Add</button>
<button on:click={resetCustomColors} style="background-color: red"
  >Reset All</button
>

<br />
<br />
<hr />
<br />

{#each customizedColors as convertedValue}
  <div style="display: flex; justify-content: space-between;">
    <div>
      <p style="display: inline-block;">
        {prettyProperty(convertedValue.variable)}:
      </p>
    </div>
    <div style="display: flex; align-items: center">
      <button on:click={() => updateCustomColor(convertedValue)}>Update</button>
      <button on:click={() => deleteCustomColor(convertedValue)}>Delete</button>

      {#each convertedValue.values as value}
        <input type="number" min="0" max="1" step="0.01" bind:value />
      {/each}
    </div>
  </div>

  <br />
{/each}

<style>
  input:invalid {
    background-color: red;
  }
</style>
