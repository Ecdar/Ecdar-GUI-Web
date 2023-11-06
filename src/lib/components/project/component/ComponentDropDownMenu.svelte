<script lang="ts">
  import { More_vert, Delete } from "svelte-google-materialdesign-icons";
  import { components } from "$lib/globalState/activeProject";
  import OverlayMenu from "$lib/components/overlayMenu/OverlayMenu.svelte";
  import Panel from "$lib/components/overlayMenu/Panel.svelte";
  import Button from "$lib/components/overlayMenu/elements/Button.svelte";

  export let index: number;

  const menuId = `component-menu-${index}`;
  let button: HTMLElement;
</script>

<button
  bind:this={button}
  popovertarget={menuId}
  id={`component-button-${index}`}
>
  <More_vert />
</button>
<OverlayMenu anchor={button} id={menuId}>
  <Panel>
    <Button
      icon={Delete}
      text="Delete"
      click={() => {
        $components?.splice(index, 1);
        $components = $components;
      }}
    />
  </Panel>
</OverlayMenu>

<style>
  button {
    background: none;
    border: none;
    cursor: pointer;
  }
</style>
