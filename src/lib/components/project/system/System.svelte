<script lang="ts">
	import { Request_page } from "svelte-google-materialdesign-icons";
	import SystemDropDownMenu from "./SystemDropDownMenu.svelte";

	export let name: string;
	export let description: string;
	export let color: string;
	export let index: number;

	function handleDoubleClick() {
		name = prompt("New name:", name) || name;
	}
</script>

<div class="system" on:dblclick={handleDoubleClick} role="button" tabindex="-1">
	<div class="left">
		<div class="circle" style="background-color: {color}">
			<div class="icon">
				<Request_page size="100%" />
			</div>
		</div>
		<p>{name}</p>
	</div>
	<div>
		<SystemDropDownMenu bind:description bind:color {index} />
	</div>
</div>

<style>
	.left {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.system {
		background-color: #eceff1;
		cursor: pointer;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 10px;
		border-bottom: 1px solid black;
		transition: background-color 200ms;
	}

	.system:hover {
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
