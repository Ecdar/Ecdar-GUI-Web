<script lang="ts">
	import {
		Folder_special,
		Request_page,
	} from "svelte-google-materialdesign-icons";
	import type { SystemId } from "$lib/classes/automaton/system/SystemId";
	import type { ComponentId } from "$lib/classes/automaton/component/ComponentId";
	import ProjectItemDropDownMenu from "./ProjectItemDropDownMenu.svelte";

	export let id: SystemId | ComponentId;
	export let description: string;
	export let color: string;
	export let includeInPeriodicCheck: boolean = false;
	export let itemType: "system" | "component";

	export let setAsActive: () => void;
	export let rename: () => void;
</script>

<button on:click={setAsActive}>
	<div class="project-item {itemType}" id="{itemType}-{id.rawId}">
		<div
			class="left"
			on:dblclick={rename}
			on:keypress={(event) => {
				if (event.key === "Enter") {
					rename();
				}
			}}
			role="button"
			tabindex="0"
		>
			<div class="circle" style="background-color: {color}">
				<div class="icon">
					{#if itemType === "component"}
						<Folder_special size="100%" tabindex="-1" />
					{:else}
						<Request_page size="100%" tabindex="-1" />
					{/if}
				</div>
			</div>
			<p>{id.rawId}</p>
		</div>
		<div>
			{#if itemType === "component"}
				<ProjectItemDropDownMenu
					bind:description
					bind:color
					bind:includeInPeriodicCheck
					{id}
					{itemType}
				/>
			{:else}
				<ProjectItemDropDownMenu
					bind:description
					bind:color
					{id}
					{itemType}
				/>
			{/if}
		</div>
	</div>
</button>

<style>
	button {
		display: block;
		color: inherit;
		font: inherit;
		border: none;
		border-bottom: 1px solid black;
		padding: 0;
		width: 100%;
	}

	button:focus-visible {
		outline: 1px solid white;
		outline-offset: -1px;
	}

	.left {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.project-item {
		background-color: var(--sidebar-element-color);
		border: none;
		cursor: pointer;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 10px;
		transition: background-color 200ms;
	}

	.project-item:hover {
		background-color: var(--sidebar-element-hover-color);
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

	.icon {
		display: flex;
		vertical-align: middle;
		padding: 15%;
	}
</style>
