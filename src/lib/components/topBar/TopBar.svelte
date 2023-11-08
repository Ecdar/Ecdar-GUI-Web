<script lang="ts">
	import TopBarBtn from "$lib/components/topBar/TopBarBtn.svelte";
	import DropDownBtn from "$lib/components/topBar/DropDownBtn.svelte";
	import DropDownCheckBox from "$lib/components/topBar/DropDownCheckBox.svelte";
	import {
		Note_add,
		File_open,
		Save,
		Done_all,
		Image,
		Arrow_left,
		Arrow_right,
		Arrow_drop_down,
		Arrow_drop_up,
		Window,
		Settings_input_composite,
		Help,
		Error,
	} from "svelte-google-materialdesign-icons";
</script>

<!--
	- TopBarBtn: The button on the navbar, where name equal text displayed in button
	- DropDownBtn: An element in the dropdown menu as a button, where name equal to text displayed 
		in button and icon which can be empty
	- DropDownCheckBox: An element in the dropdown menu as a checkbox, where name eqaul to text displayed. 
		Has two functions on:checked and on:unchecked
		Here icon should not be set.
-->

<!--File top bar button-->
<div>
	<TopBarBtn name="File">
		<DropDownBtn
			icon={Note_add}
			name="New Project"
			on:click={() => {
				console.log("New Project");
			}}
		/>
		<DropDownBtn
			icon={File_open}
			name="Open Project"
			on:click={() => {
				console.log("Open Project");
			}}
		/>
		<DropDownBtn
			icon={File_open}
			name="Recent Projects"
			on:click={() => {
				console.log("Recent Projects");
			}}
		/>
		<DropDownBtn
			icon={Save}
			name="Save Project"
			on:click={() => {
				console.log("Save Project");
			}}
		/>
		<DropDownBtn
			icon={Save}
			name="Save Project as"
			on:click={() => {
				console.log("Save Project as");
			}}
		/>

		<DropDownBtn
			icon={Done_all}
			name="New Test Plan"
			on:click={() => {
				console.log("New Test Plan");
			}}
		/>
		<DropDownBtn
			icon={Image}
			name="Export as Png"
			on:click={() => {
				console.log("Export as Png");
			}}
		/>
		<DropDownBtn
			icon={Image}
			name="Export without border as Png"
			on:click={() => {
				console.log("Export without border as Png");
			}}
		/>
	</TopBarBtn>
</div>

<!--Edit top bar button-->
<div>
	<TopBarBtn name="Edit">
		<DropDownBtn
			icon={Arrow_left}
			name="Move All Nodes Left"
			on:click={() => {
				console.log("Move All Nodes Left");
			}}
		/>
		<DropDownBtn
			icon={Arrow_right}
			name="Move All Nodes Right"
			on:click={() => {
				console.log("Move All Nodes Right");
			}}
		/>
		<DropDownBtn
			icon={Arrow_drop_up}
			name="Move All Nodes Up"
			on:click={() => {
				console.log("Move All Nodes Up");
			}}
		/>
		<DropDownBtn
			icon={Arrow_drop_down}
			name="Move All Nodes Down"
			on:click={() => {
				console.log("Move All Nodes Down");
			}}
		/>
	</TopBarBtn>
</div>

<!--View top bar button-->
<div>
	<TopBarBtn name="View">
		<DropDownCheckBox
			name="Project Panel"
			on:checked={() => {
				console.log("checked Project Panel");
			}}
			on:unchecked={() => {
				console.log("unchecked Project Panel");
			}}
		/>
		<DropDownCheckBox
			name="Query Panel"
			on:checked={() => {
				console.log("checked Query Panel");
			}}
			on:unchecked={() => {
				console.log("unchecked Query Panel");
			}}
		/>
		<DropDownCheckBox
			name="Autoscaling"
			on:checked={() => {
				console.log("checked Autoscaling");
			}}
			on:unchecked={() => {
				console.log("unchecked Autoscaling");
			}}
		/>
		<DropDownBtn
			name="Scaling"
			on:click={() => {
				console.log("Scaling");
			}}
		/>
		<DropDownBtn
			icon={Window}
			name="Split canvas"
			on:click={() => {
				console.log("Split canvas");
			}}
		/>
	</TopBarBtn>
</div>

<!--Options top bar button-->
<div>
	<TopBarBtn name="Options">
		<DropDownCheckBox
			name="UI cache"
			on:checked={() => {
				console.log("checked UI cache");
			}}
			on:unchecked={() => {
				console.log("unchecked UI cache");
			}}
		/>

		<DropDownCheckBox
			name="Periodic query execution"
			on:checked={() => {
				console.log("checked Periodic query execution");
			}}
			on:unchecked={() => {
				console.log("unchecked Periodic query execution");
			}}
		/>
		<DropDownBtn
			icon={Settings_input_composite}
			name="Engine Options"
			on:click={() => {
				console.log("Engine Options");
			}}
		/>
	</TopBarBtn>
</div>

<!--Help top bar button-->
<div>
	<TopBarBtn name="Help">
		<DropDownBtn
			icon={Help}
			name="Modelling Help"
			on:click={() => {
				console.log("Modelling Help");
			}}
		/>
		<DropDownBtn
			icon={Help}
			name="Testing Help"
			on:click={() => {
				console.log("Testing Help");
			}}
		/>
		<DropDownBtn
			icon={Error}
			name="About"
			on:click={() => {
				console.log("About");
			}}
		/>
	</TopBarBtn>
</div>

<style>
	div {
		height: 100%;
		display: block;
		float: left;
	}
</style>
