<script lang="ts">
	import { open, content, anchor } from "./state";
	import OverlayMenu from "../overlayMenu/OverlayMenu.svelte";
</script>

<OverlayMenu bind:open={$open} anchor={$anchor}>
	<svelte:component this={$content.component} {...$content.props} />
</OverlayMenu>
