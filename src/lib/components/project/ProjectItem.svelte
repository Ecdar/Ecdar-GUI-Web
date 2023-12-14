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

	const UniqueId = id.rawId.split(" ").join("-").toLowerCase();
</script>

<div class="project-item {itemType}" id={UniqueId}>
	<div
		class="left"
		on:click={setAsActive}
		on:dblclick={rename}
		on:keypress={(event) => {
			if (event.key === "Enter") {
				rename();
			}
		}}
		role="button"
		tabindex="0"
	>
		<div style="display: flex;">
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
	</div>
	<div class="right">
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

<style>
	/* button {
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
	} */

	.left {
		padding: 10px;
		width: 100%;
		overflow: hidden;
		border-right: 1px solid rgba(28, 28, 28, 0.55);
		border-image: linear-gradient(
			rgba(0, 0, 0, 0) 20%,
			rgba(0, 0, 0, 1) 20%,
			rgba(0, 0, 0, 1) 80%,
			rgba(0, 0, 0, 0) 80%
		);
		border-image-slice: 1;
	}

	.right {
		margin: 0 5px;
	}

	p {
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.project-item {
		background-color: var(--sidebar-element-color);
		border: none;
		transition: var(--sidebar-element-transition);
		cursor: pointer;
		width: 100%;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		border-bottom: 1px solid black;
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
