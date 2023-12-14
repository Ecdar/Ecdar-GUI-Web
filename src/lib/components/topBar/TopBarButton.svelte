<script lang="ts">
	import OverlayMenu from "$lib/components/overlayMenu/OverlayMenu.svelte";

	export let name: string = "Default";

	$: dropdownId = `topbar-dropdown-menu-${name}`;

	let button: HTMLButtonElement;

	//Set visibility of dropdown to no visible
	let visible: boolean = false;
</script>

<!--Show dropdown menu of given topbar item on hover-->
<!-- svelte-ignore a11y-no-static-element-interactions -->
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

	.unselectable {
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}

	.container {
		position: absolute;
		height: 0px;
		z-index: 100;
	}
</style>
