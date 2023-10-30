<script lang="ts">
	let dialogContainer: HTMLDialogElement;

	/**
	 * Function for showing the current modal
	 */
	export function showModal() {
		dialogContainer?.showModal();
	}
</script>

<dialog bind:this={dialogContainer}>
	<form method="dialog">
		<div class="box">
			<slot />
		</div>
	</form>
</dialog>

<style>
	.box {
		max-width: 100vw;
		display: block;
		position: fixed;
		background-color: lightslategray;
		z-index: 100;
		transform: translate(-50%, -50%);
		top: 50%;
		left: 50%;
		padding: 1rem;
		backdrop-filter: brightness(0.2);
	}
</style>
