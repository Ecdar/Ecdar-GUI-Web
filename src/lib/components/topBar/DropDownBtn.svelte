<script lang="ts">
	import EmptyElement from "$lib/components/topBar/Empty.svelte";
	
	export let name: string = "Default";

	export let icon:any = EmptyElement;

	

</script>


<!--Make each dropdown item, into button-->

<button class="dropdown-item" on:click>
	<svelte:component this={icon}></svelte:component>
	{name}
</button>

<style>
	

	.dropdown-item {
		display: block;
		width: 100%;
		height: 100%;
	}

	.dropdown-item:hover {
		filter: brightness(0.9);
	}
</style>
