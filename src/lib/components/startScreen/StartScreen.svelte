<script lang="ts">
	import { Project } from "$lib/classes/project/Project";
	import { project } from "$lib/globalState/activeProject";
	import SvgButton from "../buttons/SvgButton.svelte";
	import { Add, File_open } from "svelte-google-materialdesign-icons";

	function startNewProject() {
		$project = new Project();
	}

	function openProject() {
		// Add your logic to open a project here
	}
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

<div style="display: flex; flex-direction: column; width: 100%">
	<h1 style="text-align: center;">Welcome to Ecdar</h1>
	<div
		style="display: flex; width: 100%; height: 100vh; justify-content: center;"
	>
		<div class="flex-column">
			<div class="bottom-border">
				<SvgButton
					click={startNewProject}
					icon={Add}
					id={`new-project`}
					color="var(--sidebar-text-color)"
					justifyContend="center"
					><p style="font-size: 1.7em">
						New Blank Project
					</p></SvgButton
				>
			</div>

			<h2>Example projects</h2>
			<SvgButton
				click={openProject}
				icon={File_open}
				id={`open-project`}
				color="var(--sidebar-text-color)"
				justifyContend="center"><p>ecdar univeristy</p></SvgButton
			>
		</div>
		<div class="flex-column">
			<div class="bottom-border">
				<SvgButton
					click={openProject}
					icon={File_open}
					id={`open-project`}
					color="var(--sidebar-text-color)"
					justifyContend="center"
					><p style="font-size: 1.7em">Open A Project</p></SvgButton
				>
			</div>

			<h2>Recent Projects</h2>
			<SvgButton
				click={openProject}
				icon={File_open}
				id={`open-project`}
				color="var(--sidebar-text-color)"
				justifyContend="center"><p>recent 1</p></SvgButton
			>
		</div>
	</div>
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
		color: var(--navigationbar-text-color);
	}

	h2 {
		color: var(--navigationbar-text-color);
		text-align: center;
	}

	.bottom-border {
		border-bottom: 1px solid var(--navigationbar-text-color);
	}

	.flex-column {
		display: flex;
		flex-direction: column;
		width: 50%;
		margin: 5%;
	}
</style>
