<script lang="ts">
	import OverlayMenu from "$lib/components/overlayMenu/OverlayMenu.svelte";

	export let name: string = "Default";

	$: dropdownId = `topbar-dropdown-menu-${name}`;

	let button: HTMLButtonElement;
</script>

<!--Show dropdown menu of given topbar item on hover-->
<button bind:this={button} popovertarget={dropdownId}>
	{name}
</button>
<OverlayMenu id={dropdownId} anchor={button}>
	<slot />
</OverlayMenu>

<style>
	button {
		height: 100%;
		background-color: var(--main-navigationbar-color);
		border-color: transparent;
		border-right: 2px solid white;
		color: var(--navigationbar-text-color);
	}

	button:hover {
		background-color: var(--navigationbar-button-hover-color);
	}
</style>
