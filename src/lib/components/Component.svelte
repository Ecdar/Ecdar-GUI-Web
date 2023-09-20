<script lang="ts">
	import { onMount } from "svelte";
	import coord from "./objects.json";

	// Function to generate a random number within a given range
function getRandom(min: number, max: number): number {
    return Math.random() * (max - min) + min;
}

// Function to create and append a random circle to the SVG container
function createRandomCircle(svgContainer: SVGSVGElement, coordx: number, coordy: number): void {
    const circleGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
    
    // Define random attributes for the circle
    const cx = coordx; // X coordinate within the SVG's width
    const cy = coordy; // Y coordinate within the SVG's height
    const radius = 10; // Random radius
    const fill = `rgb(1, 100, 100)`; // Random fill color
    
    // Set circle attributes
	const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", cx.toString());
    circle.setAttribute("cy", cy.toString());
    circle.setAttribute("r", radius.toString());
    circle.setAttribute("fill", fill);

	//Draggable
	circle.setAttribute("draggable", "true");
    
    // Add event listeners for dragging
    let offsetX = 0;
    let offsetY = 0;
    let isDragging = false;

	circle.addEventListener("mousedown", (event) => {
        isDragging = true;
        offsetX = event.clientX - parseFloat(circle.getAttribute("cx") || "0");
        offsetY = event.clientY - parseFloat(circle.getAttribute("cy") || "0");
    });

    document.addEventListener("mousemove", (event) => {
        if (isDragging) {
            const newCx = event.clientX - offsetX;
            const newCy = event.clientY - offsetY;
            circle.setAttribute("cx", newCx.toString());
            circle.setAttribute("cy", newCy.toString());

			// Update the 'N' text position to follow the circle
            const text = circleGroup.querySelector("text");
            if (text) {
                text.setAttribute("x", newCx.toString());
                text.setAttribute("y", (newCy + radius + 15).toString()); // Adjust the 'N' position below the circle
            }
        }
    });

    document.addEventListener("mouseup", () => {
        isDragging = false;
    });
    
    // Append the circle to the SVG container
    svgContainer.appendChild(circle);

	// Add 'N' text
    const text = document.createElementNS("http://www.w3.org/2000/svg", "text");
    text.setAttribute("x", cx.toString());
    text.setAttribute("y", (cy + radius + 15).toString()); // Position 'N' below the circle
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("alignment-baseline", "middle");
    text.textContent = "N";

    // Append the circle and 'N' text to the group
    circleGroup.appendChild(circle);
    circleGroup.appendChild(text);

    // Append the group to the SVG container
    svgContainer.appendChild(circleGroup);
}

// Get the SVG container element
let svgContainer : SVGSVGElement;
onMount(() => {
	if (svgContainer) {
    // Create 10 random circles
    	for (let i = 0; i < 10000; i++) {
			const cx = coord[i].x;
			const cy = coord[i].y;
        	createRandomCircle(svgContainer, cx, cy);
    	}
	}
});

</script>

<svg bind:this={svgContainer} id="svg-container" width="1200" height="800">
	
</svg>
