<script lang="ts">
	import { Draw, Code } from "svelte-google-materialdesign-icons";
	import SvgButton from "../buttons/SvgButton.svelte";
</script>

<div id="canvas-nav">
	<div class="buttons">
		<SvgButton icon={Draw} id="toggle-draw" size={30} />
		<SvgButton icon={Code} id="toggle-draw" size={30} />
	</div>
</div>

<style>
	#canvas-nav {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		height: 100%;
		padding: 0 1em;
		background-color: var(--canvas-topbar-color);
	}

	.buttons {
		color: var(--navigationbar-text-color);
		background: none;
		border: none;
		display: flex;
	}
</style>
