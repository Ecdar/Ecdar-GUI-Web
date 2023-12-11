<script lang="ts">
	import Editor from "../editor/Editor.svelte";
	import SvgView from "$lib/components/svgView/SvgView.svelte";
	import { CanvasModes, canvasModes } from "./state";
</script>

<Editor
	isHidden={$canvasModes !== CanvasModes.Editor &&
		$canvasModes !== CanvasModes.None}
/>
<SvgView
	isHidden={$canvasModes !== CanvasModes.Draw &&
		$canvasModes !== CanvasModes.None}
/>
