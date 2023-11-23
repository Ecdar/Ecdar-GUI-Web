<script lang="ts">
	import { createEventDispatcher, type ComponentType } from "svelte";
	import DropDownButton from "./DropDownButton.svelte";
	import { Done } from "svelte-google-materialdesign-icons";
	import {
		checkboxStates,
		addCheckbox,
	} from "$lib/globalState/topbarCheckBoxes";

	//Set dafult values
	export let name: string = "Default";
	let icon: ComponentType = Done;
	export let defaultVal: boolean = false;
	let checked: boolean = defaultVal;
	let unique = {};

	addCheckbox(name, defaultVal);
	checkboxStates[name].subscribe((value) => {
		checked = value;
	});

	const dispatch = createEventDispatcher();

	function onCheck() {
		dispatch("checked");
	}

	function onUnCheck() {
		dispatch("unchecked");
	}

	function whatToCall(c: boolean) {
		c ? onCheck() : onUnCheck();
	}

	whatToCall(checked);
</script>

<!--Make each dropdown item, into button-->
{#key unique}
	<DropDownButton
		{name}
		{icon}
		color={checked ? "black" : "transparent"}
		on:click={() => {
			checkboxStates[name].update(() => {
				if (checked) {
					onUnCheck();
				} else {
					onCheck();
				}
				return !checked;
			});
			unique = {};
		}}
	/>
{/key}
