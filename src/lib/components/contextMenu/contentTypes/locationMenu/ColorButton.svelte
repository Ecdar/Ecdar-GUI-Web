<script lang="ts">
	/**
	 * A reference to the location.
	 */
	export let location: SVGElement;

	export let color: string;

	function setColor() {
		location.style.fill = color;
	}
</script>

<button
	class={`color ${color}`}
	on:click={() => {
		setColor();
	}}
/>

<style>
	.color {
		display: inline-block;
		height: 2em;
		width: 2em;
		border-radius: 100%;
	}
	.color.red {
		background-color: red;
	}
	.color.blue {
		background-color: blue;
	}
</style>
