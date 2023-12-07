<script lang="ts">
	import Editor from "../editor/Editor.svelte";
	import SvgView from "$lib/components/svgView/SvgView.svelte";
	import { CanvasModes, canvasModes } from "./state";
</script>

<Editor isHidden={$canvasModes !== CanvasModes.Editor} />
<SvgView isHidden={$canvasModes !== CanvasModes.Draw} />
