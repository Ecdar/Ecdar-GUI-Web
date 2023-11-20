<script lang="ts">
	let dialogContainer: HTMLDialogElement;
	export let ModalCloseOnBackdrop: boolean;

	/**
	 * Function for showing the current modal
	 */
	export function showModal() {
		dialogContainer.showModal();
	}

	/**
	 * Function for closing the current modal
	 */
	export function closeModal() {
		dialogContainer.close();
	}

	/**
	 * Function for closing the current modal when the backdrop is clicked if
	 * ModalCloseOnBackdrop is true
	 */
	function closeModalOnBackdropClick() {
		if (ModalCloseOnBackdrop) {
			dialogContainer.close();
		}
	}
</script>

<!--TODO: Remove this when supported by Svelte-->
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialogContainer}
	on:click|self={() => {
		closeModalOnBackdropClick();
	}}
>
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
