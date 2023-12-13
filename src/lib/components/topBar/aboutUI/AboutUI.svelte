<script lang="ts">
	import Modal from "$lib/components/dialogPopover/Modal.svelte";
	import type IModalComponent from "$lib/interfaces/IModalComponent";

	let dialogContainer!: Modal & IModalComponent;

	export function showAboutUI() {
		dialogContainer.showModal();
	}

	function closeModal() {
		dialogContainer.closeModal();
	}
</script>

<Modal bind:this={dialogContainer}>
	<div>
		<div class="box">
			<h1>Ecdar v. 0.1</h1>
			<p>Made by:</p>
			<p>&nbsp; 5. Semester, Aalborg University 2023</p>
			<p>
				For more information, go to
				<a href="https://www.ecdar.net/" target="_blank">
					www.Ecdar.net</a
				>
			</p>
		</div>
		<button on:click={closeModal}>Close</button>
	</div>
</Modal>

<style>
	.box {
		padding-left: 1em;
		color: var(--text-color);
	}

	button {
		margin-top: 2em;
		margin-left: 35em;
	}
</style>
