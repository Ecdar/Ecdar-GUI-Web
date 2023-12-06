<script lang="ts">
	import Editor from "../editor/Editor.svelte";
	import SvgView from "../svg-view/SvgView.svelte";
	import { CanvasModes, canvasModes } from "./state";

	let mode = CanvasModes.Editor;

	canvasModes.subscribe((newMode) => {
		mode = newMode;
	});

</script>

{#if mode === CanvasModes.Editor}
	<Editor />
{:else}
	<SvgView />
{/if}
