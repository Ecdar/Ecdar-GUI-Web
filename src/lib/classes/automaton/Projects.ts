import { IdMap } from "./IdMap";
import { Project } from "./Project";
import type { ProjectId, ProjectIdInput } from "./ProjectId";
import type { RawProjectId } from "./raw/RawProjectId";
import type { RawProjects } from "./raw/RawProjects";
import type { FromRaw } from "./AutomatonClass";
import type { ProjectIds } from "./ProjectIds";

export class Projects extends IdMap<
	Project,
	ProjectId,
	ProjectIdInput,
	RawProjectId,
	RawProjects
> {
	toRaw() {
		return [...this].map((project) => project.toRaw());
	}

	static readonly fromRaw: FromRaw<
		RawProjects,
		{ projectIds: ProjectIds },
		Projects
	> = (raw, { projectIds }) => {
		const projects = new Projects(projectIds);
		for (const rawProject of raw) {
			const id = rawProject.name
				? projects.ids.getNewIdFromRaw(rawProject.name)
				: projects.ids.getNewOrderedId();

			if (!id)
				if (rawProject.name) {
					//TODO: Make this a user-friendly message with different options for recovering
					throw new TypeError(
						`Cannot load raw Projects where multiple names are equivalent: "${rawProject.name}"`,
					);
				} else {
					//TODO: Make this a user-friendly message with different options for recovering
					throw new TypeError(
						`Encountered an unknown error while assigning a unique ID to an unnamed Project`,
					);
				}

			projects.add(Project.fromRaw(rawProject, { id }));
		}
		return projects;
	};
}
