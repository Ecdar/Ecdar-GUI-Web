<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Button from "$lib/components/overlayMenu/elements/Button.svelte";
	import {
		Check_box,
		Check_box_outline_blank,
	} from "svelte-google-materialdesign-icons";
	/*import {
		checkboxStates,
		addCheckbox,
	} from "$lib/globalState/topbarCheckBoxes";*/

	//Set default values
	export let text: string = "Default";
	export let defaultVal: boolean = false;
	let checked: boolean = defaultVal;
	$: icon = checked ? Check_box : Check_box_outline_blank;
	let unique = {};

	/*addCheckbox(text, defaultVal);
	checkboxStates[text].subscribe((value) => {
		checked = value;
	});*/

	const dispatch = createEventDispatcher();

	function onCheck() {
		checked = true;
		//checkboxStates[text].set(true);
		dispatch("checked");
	}

	function onUnCheck() {
		checked = false;
		//checkboxStates[text].set(false);
		dispatch("unchecked");
	}

	function toggle() {
		if (checked) {
			onUnCheck();
		} else {
			onCheck();
		}
	}

	toggle();
</script>

<!--Make each dropdown item, into button-->
{#key unique}
	<Button
		{text}
		{icon}
		on:click={() => {
			toggle();
			unique = {};
		}}
	/>
{/key}
