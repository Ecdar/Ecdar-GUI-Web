<svelte:options accessors />

<script lang="ts">
	export let x: number;
	export let y: number;
	export let color: string;
	export let name: string;
	export const locationID: string = "";

	let location: SVGSVGElement;

	export function hide(){
		location.style.display = "none";
	}

	export function show(){
		location.style.display = "block";
	}


	export function draw(){
		const circleGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');

		// Set circle attributes
		const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
		circle.setAttribute('cx', x.toString());
		circle.setAttribute('cy', y.toString());
		circle.setAttribute('r', '20');
		circle.setAttribute('fill', color);

		const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		text.textContent = name;
		text.setAttribute('text-anchor', 'middle');
		text.setAttribute('x', x.toString());
		text.setAttribute('y', (y + 40).toString());

		//Draggable
		circle.setAttribute('draggable', 'true');

		// Add event listeners for dragging
		let offsetX = 0;
		let offsetY = 0;
		let isDragging = false;

		circle.addEventListener('mousedown', (event) => {
			isDragging = true;
			offsetX = event.clientX - parseFloat(circle.getAttribute('cx') || '0');
			offsetY = event.clientY - parseFloat(circle.getAttribute('cy') || '0');
		});

		document.addEventListener('mousemove', (event) => {
			if (!isDragging) return;

			const newCx = event.clientX - offsetX;
			const newCy = event.clientY - offsetY;
			circle.setAttribute('cx', newCx.toString());
			circle.setAttribute('cy', newCy.toString());
			// Update the 'N' text position to follow the circle
			const text = circleGroup.querySelector('text');
			if (text) {
				text.setAttribute('x', newCx.toString());
				text.setAttribute('y', (newCy + 40).toString()); // Adjust the 'N' position below the circle
			}
			
		});
		document.addEventListener('mouseup', () => {
			isDragging = false;
		});
		

		circleGroup.append(text);
		circleGroup.append(circle);
		location.append(circleGroup);
	}
</script>

<svg bind:this={location} />
