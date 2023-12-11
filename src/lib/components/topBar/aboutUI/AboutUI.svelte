<script lang="ts">
	import Modal from "$lib/components/dialogPopover/Modal.svelte";
	import type IModalComponent from "$lib/interfaces/IModalComponent";

	let dialogContainer: Modal & IModalComponent;

	export function showModal() {
		dialogContainer.showModal();
	}

	export function closeModal() {
		dialogContainer.closeModal();
	}
</script>

<Modal bind:this={dialogContainer}>
	<form>
		<div>
			<div class="box">
				<h2>Ecdar v. 0.1</h2>
				Made by:
				<br /><br />
				5. Semester, Aalborg University 2023
				<br /><br />
				For more information go to
				<a href="https://www.ecdar.net/" target="_blank"> Ecdar.net</a>
			</div>
			<button on:click={closeModal}>Close</button>
		</div>
	</form>
</Modal>

<style>
	form {
		height: 15em;
		width: 25em;
		background-color: white;
	}

	.box {
		padding: 1em;
	}

	button {
		margin-left: 80%;
	}
</style>
