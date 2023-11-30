import { IdStore } from "./IdStore";
import { ProjectId, type ProjectIdInput } from "./ProjectId";
import type { RawProjectId } from "./raw/RawProjectId";

export class ProjectIds extends IdStore<
	ProjectId,
	ProjectIdInput,
	RawProjectId
> {
	constructor() {
		super(ProjectId);
	}
}
