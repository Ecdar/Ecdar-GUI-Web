<script lang="ts">
	import {
		More_vert,
		Folder_special,
	} from "svelte-google-materialdesign-icons";

	export let name: string = "Component";
	export let color: string = "grey";
</script>

<div class="component">
	<div class="left">
		<div class="circle" style="background-color: {color}">
			<div class="icon">
				<Folder_special size="100%" />
			</div>
		</div>
		<p>{name}</p>
	</div>
	<div>
		<More_vert />
	</div>
</div>

<style>
	.left {
		display: flex;
		align-items: center;
		width: 100%;
	}

	.component {
		background-color: #eceff1;
		cursor: pointer;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 10px;
		border-bottom: 1px solid black;
		transition: background-color 200ms;
	}

	.component:hover {
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
