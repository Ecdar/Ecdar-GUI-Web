<script lang="ts">
	let currentSide: string = '';
	let leftLength: number = 300;
	let rightLength: number = 300;
	let mainContainer: HTMLElement;

	function resize(e: MouseEvent) {
		e.preventDefault();
		if (currentSide === 'left') {
			leftLength = e.x;
		} else {
			rightLength = window.innerWidth - e.x;
		}
	}

	function startExpand(e: PointerEvent, side: string) {
		e.preventDefault();
		currentSide = side;
		mainContainer.addEventListener('pointermove', resize);
		mainContainer.addEventListener('pointerup', stopExpand);
	}

	function stopExpand() {
		currentSide = '';
		mainContainer.removeEventListener('pointermove', resize);
		mainContainer.removeEventListener('pointerup', stopExpand);
	}
</script>

<!-- Top navigation bar -->
<nav id="main-nav"></nav>
<main bind:this={mainContainer}>
	<!-- Left side bar -->
	<div class="sidebar" style="flex-basis: {leftLength}px">
		<nav class="inner-nav1">Nav 1</nav>
		<p>Left</p>
	</div>
	<!-- Left resize bar -->
	<div
		role="button"
		id="leftresizer"
		class="resizer"
		tabindex="-1"
		on:pointerdown={event => {
			startExpand(event, 'left');
		}}
	/>
	<!-- Canvas -->
	<div class="canvas">
		<nav class="inner-nav2">Nav 2</nav>
		<p>Canvas</p>
	</div>
	<!-- Right resize bar -->
	<div
		role="button"
		id="leftresizer"
		class="resizer"
		tabindex="-1"
		on:pointerdown={event => {
			startExpand(event, 'right');
		}}
	/>
	<!-- Right side bar -->
	<div class="sidebar" style="flex-basis: {rightLength}px">
		<nav class="inner-nav3">Nav 3</nav>
		<p>Right</p>
	</div>
</main>
<!-- Footer component -->
<footer>Footer/Console</footer>

<style>
	nav {
		height: 50px;
		background-color: slategrey;
	}

	#main-nav {
		height: 25px;
	}

	main {
		display: flex;
		height: 100%;
	}

	.inner-nav1,
	.inner-nav3 {
		background-color: slategrey;
	}

	.inner-nav2 {
		background-color: lightslategrey;
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

	footer {
		height: 25px;
		background-color: slategrey;
	}
</style>
