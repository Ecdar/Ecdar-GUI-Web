<script lang="ts">
	import { Description } from "svelte-google-materialdesign-icons";

	function handleGlobalDeclarationsClick() {
		console.log("Global Declarations clicked");
	}
</script>

<button on:click={handleGlobalDeclarationsClick}>
	<div id="global-dec">
		<div class="circle" style="background-color: grey">
			<div class="icon">
				<Description size="100%" tabindex="-1" />
			</div>
		</div>
		<p>Global Declarations</p>
	</div>
</button>

<style>
	button {
		color: inherit;
		font: inherit;
		border: none;
		border-bottom: 1px solid black;
		padding: 0;
		width: 100%;
	}

	button:focus-visible {
		outline: 1px solid white;
		outline-offset: -1px;
	}

	#global-dec {
		background-color: var(--sidebar-element-color);
		transition: var(--sidebar-element-transition);
		cursor: pointer;
		display: flex;
		justify-content: flex-start;
		align-items: center;
		padding: 10px;
		border-bottom: 1px solid black;
	}

	#global-dec:hover {
		background-color: var(--sidebar-element-hover-color);
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
