<script lang="ts">
	import {
		More_vert,
		Request_page,
	} from "svelte-google-materialdesign-icons";
	export let name: string = "Component";
	export let color: string = "grey";
</script>

<div class="system">
	<div class="left">
		<div class="circle" style="background-color: {color}">
			<div class="icon">
				<Request_page size="100%" />
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
	.system {
		background-color: var(--sidebar-element-color);
		cursor: pointer;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 10px;
		border-bottom: 1px solid black;
		height: 60px;
	}
	.system:hover {
		background-color: var(--sidebar-element-hover-color);
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
