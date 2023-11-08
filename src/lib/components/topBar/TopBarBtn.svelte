<script lang="ts">
	import TopBarDropDown from "../topBar/TopBarDropDown.svelte";

	export let name: string = "Default";

	//Set visibility of dropdown to no visible
	let visible: boolean = false;
</script>

<!--Show dropdown menu of given topbar item on hover-->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	class="unselectable"
	on:mouseenter={() => {
		visible = true;
	}}
	on:mouseleave={() => {
		visible = false;
	}}
>
	<button>
		{name}
	</button>
	<div class="container">
		{#if visible}
			<TopBarDropDown>
				<slot />
			</TopBarDropDown>
		{/if}
	</div>
</div>

<style>
	.container {
		position: absolute;
		height: 0px;
		z-index: 100;
	}

	div {
		height: 100%;
	}

	button {
		height: 100%;
		background-color: slategrey;
		border-color: transparent;
		border-right: 2px solid black;
		color: rgb(0, 0, 0);
	}

	button:hover {
		filter: brightness(0.9);
	}

	.unselectable {
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
</style>
