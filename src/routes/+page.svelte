<script lang="ts">
	let currentSide: string = '';
	let leftLength: number = 300;
	let rightLength: number = 300;

	function resize(e: MouseEvent) {
		if (currentSide != '') {
			e.preventDefault();
			if (currentSide === 'left') {
				leftLength = e.x;
			} else {
				rightLength = window.innerWidth - e.x;
			}
		}
	}

	function startExpand(side: string) {
		currentSide = side;
	}

	function stopExpand() {
		currentSide = '';
	}
</script>

<main>
	<div class="sidebar" style="flex-basis: {leftLength}px">Left</div>
	<div
		role="button"
		id="leftresizer"
		class="resizer"
		tabindex="-1"
		on:pointerdown={() => {
			startExpand('left');
		}}
	/>
	<div class="canvas">Canvas</div>
	<div
		role="button"
		id="leftresizer"
		class="resizer"
		tabindex="-1"
		on:pointerdown={() => {
			startExpand('right');
		}}
	/>
	<div class="sidebar" style="flex-basis: {rightLength}px">Right</div>
</main>

<svelte:document on:pointermove={resize} on:pointerup|passive={stopExpand} />

<style>
	main {
		display: flex;
		height: 100vh;
	}

	main div {
		height: 100%;
	}

	.sidebar {
		background-color: whitesmoke;
		flex-basis: 200px;
	}

	.resizer {
		background-color: black;
		flex-basis: 5px;
		cursor: col-resize;
	}

	.canvas {
		background-color: whitesmoke;
		flex-grow: 1;
	}
</style>
