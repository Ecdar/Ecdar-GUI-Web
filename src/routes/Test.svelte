<script>
  import { Project } from "$lib/classes/automaton";
  $: project = new Project();

</script>

<button on:click={async () => { project = await Project.load() }}> Load </button>
<button on:click={async () => { project.save() }}> Save </button>

<p>{JSON.stringify(project)}</p>

