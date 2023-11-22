<script lang="ts">
	import { queries } from "$lib/globalState/activeProject";
	import OverlayMenu from "$lib/components/overlayMenu/OverlayMenu.svelte";
	import Panel from "$lib/components/overlayMenu/Panel.svelte";
	import Button from "$lib/components/overlayMenu/elements/Button.svelte";
	import SvgButton from "$lib/components/buttons/SvgButton.svelte";
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

	/**
	 * Function for toggling the isPeriodic variable
	 * @param event
	 */
	function togglePeriodicCheck(event: MouseEvent) {
		event.stopPropagation();
		isPeriodic = !isPeriodic;
	}
</script>

<SvgButton
	bind:button
	icon={More_vert}
	popovertarget={menuId}
	id={`query-button-${index}`}
	color="var(--sidebar-text-color)"
/>
<OverlayMenu anchor={button} id={menuId}>
	<Panel>
		<Button
			icon={isPeriodic ? Check_box : Check_box_outline_blank}
			text="Run Periodically"
			click={togglePeriodicCheck}
		/>
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
