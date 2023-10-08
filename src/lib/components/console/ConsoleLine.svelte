<script lang="ts">
	export let componentText: string;
</script>

<div class="nowrap">
	<p class="unselectable">></p>
	<p>{componentText}</p>
</div>

<style>
	p {
		display: inline-block;
		margin: 0.2em 0em 0.2em 0.5em;
		text-shadow: 0 1.5px 1px rgba(28, 28, 28, 0.3);
	}

	.nowrap {
		white-space: nowrap;
	}

	.unselectable {
		-moz-user-select: -moz-none;
		-khtml-user-select: none;
		-webkit-user-select: none;
		-ms-user-select: none;
		user-select: none;
	}
</style>
