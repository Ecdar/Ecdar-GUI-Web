<script lang="ts">
	import { queries } from "$lib/globalState/activeProject";
	import OverlayMenu from "$lib/components/overlayMenu/OverlayMenu.svelte";
	import Panel from "$lib/components/overlayMenu/Panel.svelte";
	import Button from "$lib/components/overlayMenu/elements/Button.svelte";
	import {
		More_vert,
		Check_box,
		Check_box_outline_blank,
		Restart_alt,
		Delete,
	} from "svelte-google-materialdesign-icons";

	export let isPeriodic: boolean;
	export let index: number;

	const menuId = `query-menu-${index}`;
	let button: HTMLElement;

	function togglePeriodicCheck(event: MouseEvent) {
		event.stopPropagation();
		isPeriodic = !isPeriodic;
	}
</script>

<button bind:this={button} popovertarget={menuId} id={`query-button-${index}`}>
	<More_vert />
</button>
<OverlayMenu anchor={button} id={menuId}>
	<Panel>
		{#if isPeriodic}
			<Button
				icon={Check_box}
				text="Run Periodically"
				click={togglePeriodicCheck}
			/>
		{:else}
			<Button
				icon={Check_box_outline_blank}
				text="Run Periodically"
				click={togglePeriodicCheck}
			/>
		{/if}
	</Panel>
	<Panel>
		<Button icon={Restart_alt} text="Clear Status" click={() => {}} />
	</Panel>
	<Panel>
		<Button
			icon={Delete}
			text="Delete"
			click={() => {
				$queries?.arr.splice(index, 1);
				$queries = $queries;
			}}
		/>
	</Panel>
</OverlayMenu>

<style>
	button {
		background: none;
		border: none;
		cursor: pointer;
		height: 24px;
		padding: 0;
		color: var(--sidebar-text-color);
	}
</style>
