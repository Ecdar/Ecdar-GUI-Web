<script lang="ts">
	import TopBarBtn from "$lib/components/topBar/TopBarBtn.svelte";
	import DropDownBtn from "$lib/components/topBar/DropDownBtn.svelte";
	import { load } from "$lib/classes/project";
	import * as Icon from "svelte-google-materialdesign-icons"
	
</script>

<!--File top bar button-->
<div>
	<TopBarBtn name="File">
		<DropDownBtn
			icon = {Icon.Note_add}
			name="New Project"
			on:click={() => {
				console.log("New Project");
			}}
		/>
		<DropDownBtn
			icon = {Icon.File_open}
			name="Open Project"
			on:click={async () => {
				if (load != undefined) await load();
			}}
		/>
		<DropDownBtn
			icon = {Icon.File_open}
			name="Recent Projects"
			on:click={() => {
				console.log("Recent Projects");
			}}
		/>
		<DropDownBtn
			icon = {Icon.Save}
			name="Save Project"
			on:click={() => {
				console.log("Save Project");
			}}
		/>
		<DropDownBtn
			icon = {Icon.Save}
			name="Save Project as"
			on:click={() => {
				console.log("Save Project as");
			}}
		/>

		<DropDownBtn
			icon={Icon.Done_all}
			name="New Test Plan"
			on:click={() => {
				console.log("New Test Plan");
			}}
		/>
		<DropDownBtn
			icon={Icon.Image}
			name="Export as Png"
			on:click={() => {
				console.log("Export as Png");
			}}
		/>
		<DropDownBtn
			icon={Icon.Image}
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
			icon={Icon.Arrow_left}
			name="Move All Nodes Left"
			on:click={() => {
				console.log("Move All Nodes Left");
			}}
		/>
		<DropDownBtn
			icon={Icon.Arrow_right}
			name="Move All Nodes Right"
			on:click={() => {
				console.log("Move All Nodes Right");
			}}
		/>
		<DropDownBtn
			icon={Icon.Arrow_drop_up}
			name="Move All Nodes Up"
			on:click={() => {
				console.log("Move All Nodes Up");
			}}
		/>
		<DropDownBtn
			icon={Icon.Arrow_drop_down}
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
		<DropDownBtn
			
			name="Project Panel"
			on:click={() => {
				console.log("Project Panel");
			}}
		/>
		<DropDownBtn
			name="Query Panel"
			on:click={() => {
				console.log("Query Panel");
			}}
		/>
		<DropDownBtn
			name="Autoscaling"
			on:click={() => {
				console.log("Autoscaling");
			}}
		/>
		<DropDownBtn
			name="Scaling"
			on:click={() => {
				console.log("Scaling");
			}}
		/>
		<DropDownBtn
			icon={Icon.Window}
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
		<DropDownBtn
			name="UI cache"
			on:click={() => {
				console.log("UI cache");
			}}
		/>
		<DropDownBtn
			name="Periodic query execution"
			on:click={() => {
				console.log("Periodic query execution");
			}}
		/>
		<DropDownBtn
			icon={Icon.Settings_input_composite}
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
			icon={Icon.Help}
			name="Modelling Help"
			on:click={() => {
				console.log("Modelling Help");
			}}
		/>
		<DropDownBtn
			icon={Icon.Help}
			name="Testing Help"
			on:click={() => {
				console.log("Testing Help");
			}}
		/>
		<DropDownBtn
			icon={Icon.Error}
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
