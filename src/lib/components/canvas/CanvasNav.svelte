<script lang="ts">
	import { Draw, Code } from "svelte-google-materialdesign-icons";
	import SvgButton from "../buttons/SvgButton.svelte";

	import { CanvasModes, CanvasSupports, canvasModes, canvasSupports} from "./state";

	let supports = CanvasSupports.OnlyEditor; 
	let mode = CanvasModes.Editor;

	canvasModes.subscribe( (newMode) => {
		mode = newMode;
	})

	canvasSupports.subscribe( (newSupports) => {
		supports = newSupports;
	});
</script>

<div id="canvas-nav">
	<div class="buttons">
		{#if (supports !== CanvasSupports.OnlyEditor || supports === CanvasSupports.Both) && mode !== CanvasModes.Draw}
		  <SvgButton icon={Draw} id="toggle-draw" size={30} click={() => {
			  canvasModes.update(() => CanvasModes.Draw);

			}}/>
		{/if}
		{#if (supports !== CanvasSupports.OnlyDraw || supports === CanvasSupports.Both) && mode !== CanvasModes.Editor}
		  <SvgButton icon={Code} id="toggle-editor" size={30} click={() => {
			  canvasModes.update(() => CanvasModes.Editor);
		  }} />
		{/if}
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
