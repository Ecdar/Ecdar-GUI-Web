<script lang="ts">
	import { Description } from "svelte-google-materialdesign-icons";
</script>

<div class="global-dec">
	<div class="circle" style="background-color: grey">
		<div class="icon">
			<Description size="100%" />
		</div>
	</div>
	<p>Global Declarations</p>
</div>

<style>
	.global-dec {
		background-color: #eceff1;
		cursor: pointer;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 10px;
		border-bottom: 1px solid black;
		transition: background-color 200ms;
	}

	.global-dec:hover {
		background-color: #cfd8dc;
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
