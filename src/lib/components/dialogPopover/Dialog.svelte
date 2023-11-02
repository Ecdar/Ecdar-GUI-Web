<script lang="ts">
	let dialogContainer: HTMLDialogElement;

	/**
	 * Function for showing the current modal
	 */
	export function showModal() {
		dialogContainer?.showModal();
	}

	export function closeModal(){
		dialogContainer.close();
	}
</script>

<dialog bind:this={dialogContainer}>
	<div class="box">
		<slot />
	</div>
</dialog>

<style>
	.box {
		max-width: 100vw;
		max-height: 75vh;
		overflow-y: auto;
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
