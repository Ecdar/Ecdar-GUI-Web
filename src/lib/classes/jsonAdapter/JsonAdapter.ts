import { get } from "svelte/store";
import { projects as projectsStore } from "$lib/globalState/projects";
import {
	deserializeRaw,
	serializeRaw,
} from "$lib/classes/jsonAdapter/zodSerializers";
import { ZodRawProject } from "$lib/classes/automaton/raw/RawProject";
import { Project } from "$lib/classes/automaton/Project";

class JsonAdapter {
	/**
	 * Returns a `Project` from a raw JSON import.
	 */
	import(json: string) {
		const projects = get(projectsStore);

		const rawProject = deserializeRaw(ZodRawProject, json);

		const id = rawProject.name
			? projects.ids.getNewIdFromRaw(rawProject.name)
			: projects.ids.getNewOrderedId();

		return Project.fromRaw(rawProject, { id });
	}

	/**
	 * Returns a raw JSON string from a `Project`.
	 */
	export(project: Project) {
		const rawProject = project.toRaw();

		return serializeRaw(rawProject);
	}
}

export const jsonAdapter = new JsonAdapter();
