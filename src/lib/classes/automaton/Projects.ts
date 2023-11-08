import type { FromRaw } from "./AutomatonClass";
import { IdMap } from "./IdMap";
import type { RawStringId } from "./raw/RawId";
import { Project } from "./Project";
import { ProjectId } from "./ProjectId";
import type { RawProjects } from "./raw/RawProjects";

export class Projects extends IdMap<
	Project,
	ProjectId,
	string,
	RawStringId,
	RawProjects
> {
	constructor() {
		super(ProjectId);
	}

	toRaw() {
		return [...this].map((project) => project.toRaw());
	}

	static readonly fromRaw: FromRaw<RawProjects, undefined, Projects> = (
		raw,
	) => {
		const projects = new Projects();
		for (const rawProject of raw) {
			const id = rawProject.name
				? projects.getNewIdFromRaw(rawProject.name)
				: projects.getNewOrderedId();

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
