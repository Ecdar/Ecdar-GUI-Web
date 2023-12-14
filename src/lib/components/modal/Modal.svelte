<script lang="ts">
	let dialog: HTMLDialogElement | undefined;

	/**
	 * Will allows the user to close the modal by clicking outside it.
	 */
	export let closeOnBackdrop: boolean = false;

	/**
	 * Whether or not the modal is open or closed.
	 */
	export let show: boolean = false;

	/**
	 * Ensures that the real DOM element is opened or closed when the svelte value changes.
	 */
	$: if (dialog && show) {
		dialog.showModal();
	} else {
		dialog?.close();
	}

	/**
	 * Closes the modal if the user clicks outside it
	 * Only works if ModalCloseOnBackdrop is true
	 */
	function closeOnBackdropClick(event: MouseEvent) {
		if (!closeOnBackdrop) return;
		if (!dialog) {
			throw new TypeError("Dialog should always be defined on mount");
		}
		/**
		 * TODO: Is there really no better way to check if the user clicked outside?
		 */
		const rect = dialog.getBoundingClientRect();
		const clickIsOnDialog =
			rect.top <= event.clientY &&
			event.clientY <= rect.top + rect.height &&
			rect.left <= event.clientX &&
			event.clientX <= rect.left + rect.width;
		if (!clickIsOnDialog) {
			show = false;
		}
	}
</script>

<!--TODO: Remove this when supported by Svelte-->
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	bind:this={dialog}
	on:click|self={(event) => {
		closeOnBackdropClick(event);
	}}
>
	<slot />
</dialog>

<style>
	dialog {
		background-color: var(--background-color);
	}
	dialog::backdrop {
		background-color: var(--modal-background-color);
	}
</style>
