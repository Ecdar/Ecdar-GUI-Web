<script lang="ts">
	import Editor from "../editor/Editor.svelte";
	import SvgView from "../svg-view/SvgView.svelte";

	let editor: boolean = true;
</script>


{#if editor}
	<Editor />
{:else}
	<SvgView />
{/if}


