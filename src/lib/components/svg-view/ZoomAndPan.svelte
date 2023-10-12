<script lang="ts">
	let svgX: number = 0;
	let svgY: number = 0;
	let zoomFactor: number = 1;

	function handleWheel(event: WheelEvent): void {
		const rect = (event.target as HTMLElement).getBoundingClientRect();

		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		const prevZoomFactor: number = zoomFactor;

		// Update the zoom factor based on the wheel event
		if (event.deltaY > 0) {
			zoomFactor *= 1.1;
		} else {
			zoomFactor /= 1.1;
		}

		svgX -= x * (1 / prevZoomFactor - 1 / zoomFactor);
		svgY -= y * (1 / prevZoomFactor - 1 / zoomFactor);
	}

	let dragging: boolean = false;
	let lastX: number, lastY: number;

	function handleMouseDown(event: MouseEvent): void {
		dragging = true;
		lastX = event.clientX;
		lastY = event.clientY;
	}

	function handleMouseMove(event: MouseEvent): void {
		if (dragging) {
			const dx: number = event.clientX - lastX;
			const dy: number = event.clientY - lastY;
			svgX -= dx / zoomFactor;
			svgY -= dy / zoomFactor;

			lastX = event.clientX;
			lastY = event.clientY;
		}
	}

	function handleMouseUp(): void {
		dragging = false;
	}
</script>

<div
	role="button"
	tabindex="-1"
	on:wheel={handleWheel}
	on:mousedown={handleMouseDown}
	on:mousemove={handleMouseMove}
	on:mouseup={handleMouseUp}
	style="overflow: hidden; position: relative; width: 500px; height: 500px;"
>
	<svg
		viewBox={`${svgX} ${svgY} ${500 / zoomFactor} ${500 / zoomFactor}`}
		style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"
	>
		<slot />
	</svg>
</div>
