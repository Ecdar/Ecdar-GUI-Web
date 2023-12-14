<script lang="ts">
	import Panel from "$lib/components/overlayMenu/Panel.svelte";
	import Button from "$lib/components/overlayMenu/elements/Button.svelte";
	import ColorButton from "./ColorButton.svelte";
	import {
		Star,
		Zoom_in,
		Delete,
		Warning,
	} from "svelte-google-materialdesign-icons";

	/**
	 * A reference to the location.
	 */
	export let location: SVGElement;
</script>

<Panel>
	<Button icon={Zoom_in} text="View" click={() => {}} />
</Panel>
<Panel>
	<Button
		icon={Delete}
		text="Delete"
		click={() => {
			// TODO: implement
		}}
	/>
	<Button
		icon={Warning}
		text="Deattach"
		click={() => {
			// TODO: implement
		}}
	/>
	<Button
		icon={Star}
		text="Star"
		click={() => {
			// TODO: implement
		}}
	/>
</Panel>
<Panel>
	<p>Color</p>
	<ColorButton {location} color="red" />
	<ColorButton {location} color="blue" />
</Panel>
