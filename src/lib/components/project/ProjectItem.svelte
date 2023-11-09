<script lang="ts">
	import {
		Folder_special,
		Request_page,
	} from "svelte-google-materialdesign-icons";
	import ComponentDropDownMenu from "./ComponentDropDownMenu.svelte";
	import SystemDropDownMenu from "./SystemDropDownMenu.svelte";

	export let name: string;
	export let description: string;
	export let color: string;
	export let index: number;
	export let itemType: string;

	function handleDoubleClick() {
		name = prompt("New name:", name) || name;
	}
</script>

<div
	class="project-item"
	on:dblclick={handleDoubleClick}
	role="button"
	tabindex="-1"
>
	<div class="left">
		<div class="circle" style="background-color: {color}">
			<div class="icon">
				{#if itemType === "component"}
					<Folder_special size="100%" />
				{:else}
					<Request_page size="100%" />
				{/if}
			</div>
		</div>
		<p>{name}</p>
	</div>
	<div>
		{#if itemType === "component"}
			<ComponentDropDownMenu bind:description bind:color {index} />
		{:else}
			<SystemDropDownMenu bind:description bind:color {index} />
		{/if}
	</div>
</div>

<style>
	.left {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.project-item {
		background-color: #eceff1;
		cursor: pointer;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 10px;
		border-bottom: 1px solid black;
		transition: background-color 200ms;
	}

	.project-item:hover {
		background-color: #cfd8dc;
	}

	.icon {
		display: flex;
		vertical-align: middle;
		padding: 15%;
	}

	.circle {
		margin-right: 10px;
		display: flex;
		height: 50px;
		width: 50px;
		min-width: 50px;
		border-radius: 70px;
		justify-content: center;
	}
</style>
