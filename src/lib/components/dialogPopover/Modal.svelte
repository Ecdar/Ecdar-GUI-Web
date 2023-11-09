<script lang="ts">
	let dialogContainer: HTMLDialogElement;

	/**
	 * Function for showing the current modal
	 */
	export function showModal() {
		dialogContainer.showModal();
	}

	export function closeModal() {
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
		display: block;
		position: fixed;
		background-color: var(--console-unselectedtab-color);
		z-index: 100;
		transform: translate(-50%, -50%);
		top: 50%;
		left: 50%;
	}

	dialog {
		max-width: 100vw;
		width: 100vw;
		max-height: 100vh;
		height: 100vh;
		background-color: rgba(0, 0, 0, 0.2);
	}
</style>
