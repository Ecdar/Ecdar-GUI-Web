<script lang="ts">
	import Node from '../lib/components/NodeComponent.svelte';
	import {onMount} from 'svelte';

	class Coord {
		constructor(x: number, y: number) {
			this.x = x;
			this.y = y;
		}
		x: number;
		y: number;
	}

	class CoordCombination {
		constructor(from: Coord, to: Coord) {
			this.from = from;
			this.to = to;
		}
		from: Coord;
		to: Coord;
	}

	const circleSize:string = "0.5rem";
	let nodeCoordinates: Coord[] = [];
	let edgeCoordCombinations: CoordCombination[] = [];
	
	function randomIntFromInterval(min: number, max: number): number { // min and max included 
		return Math.floor(Math.random() * (max - min + 1) + min)
	}
	
	function randLoc(): Coord {
		let tempCoordinate: Coord = new Coord(0,0);
		
		tempCoordinate.x = randomIntFromInterval(0, screen.availHeight);
		tempCoordinate.y = randomIntFromInterval(0, screen.availWidth);
		
		return tempCoordinate;
	}
	let length: number = 0;
	onMount(() => {
		// Set node amount
		length = 40000;

		// Generate node coordinates
		for(let i:number = 0; i < length; i++) {
			nodeCoordinates.push(randLoc());
		}
		nodeCoordinates = nodeCoordinates;

		// Generate edge To and From combinations
		/*
		nodeCoordinates.forEach(from => {
			nodeCoordinates.forEach(to => {
				edgeCoordCombinations.push(new CoordCombination(from, to));
			});
		});
		edgeCoordCombinations = edgeCoordCombinations;*/
	});



</script>

<p>Test: <b>HTML</b>, Nodes: <b>{length}</b></p>
{#each nodeCoordinates as coordinate}
	<Node width={circleSize} height={circleSize} top={coordinate.x} left={coordinate.y}/>
{/each}
