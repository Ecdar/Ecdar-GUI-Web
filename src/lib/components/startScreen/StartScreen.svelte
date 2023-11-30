<script lang="ts">
	import { onMount } from "svelte";
	import type { projectHandler as ProjectHandler } from "$lib/classes/projectHandler/ProjectHandler";
	import { projectExamples } from "$lib/projectExamples";
	import { recentProjects } from "$lib/globalState/recentProjects";
	let projectHandler: typeof ProjectHandler;
	onMount(async () => {
		projectHandler = (
			await import("$lib/classes/projectHandler/ProjectHandler")
		).projectHandler;
	});
	const relativeTimeFormat = new Intl.RelativeTimeFormat();
</script>

<div>
	<h1>Welcome to Ecdar</h1>
	<button
		id="start-new-project"
		on:click={() => {
			projectHandler.openNewProject();
		}}>Start a new project</button
	>
	<button
		id="open-project"
		on:click={async () => {
			await projectHandler.openProject();
		}}>Open a project</button
	>
	<p>Open an example</p>
	{#each Object.entries(projectExamples) as [exampleName, exampleLoader]}
		<button
			class="open-example"
			id={`open-example-${exampleName.replaceAll(" ", "-")}`}
			on:click={async () => {
				await projectHandler.openExampleProject(exampleLoader);
			}}>{exampleName}</button
		>
	{/each}

	<p>Recently opened</p>
	{#each $recentProjects as recentProject}
		<button
			class="recently-opened"
			on:click={async () => {
				await projectHandler.openRecentProject(recentProject);
			}}
		>
			<p>{recentProject.directoryHandle.name}</p>
			<p>
				Accessed {relativeTimeFormat.format(
					(recentProject.lastAccessed - Date.now()) /
						(1000 * 60 * 60),
					"hours",
				)}
			</p>
		</button>
	{/each}
</div>

<style>
	h1 {
		color: var(--canvas-text-color);
	}
</style>
