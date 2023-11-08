import { AutomatonClass, type FromRaw } from "./AutomatonClass";
import type { RawProject } from "./raw/RawProject";
import type { HasId } from "./HasId";
import type { ProjectId } from "./ProjectId";
import { Components } from "./component/Components";
import { Locations } from "./Locations";
import { Systems } from "./system/Systems";
import { Query } from "./Query";
import { SystemDeclarations } from "./SystemDeclarations";
import { GlobalDeclarations } from "./GlobalDeclarations";

export class Project
	extends AutomatonClass<RawProject>
	implements HasId<ProjectId>
{
	constructor(
		/**
		 * The name of the project, and the name of the save folder
		 */
		public id: ProjectId,

		/**
		 * All locations in the project
		 */
		readonly locations: Locations = new Locations(),

		/**
		 * All components in the project
		 */
		public components: Components,

		/**
		 * All systems in the project
		 */
		public systems: Systems,

		/**
		 * All queries in the project
		 */
		public queries: Query[] = [],

		/**
		 * The system declarations in the project
		 */
		public systemDeclarations = new SystemDeclarations(),

		/**
		 * The global declarations in the project
		 */
		public globalDeclarations = new GlobalDeclarations(),
	) {
		super();
	}

	toRaw() {
		return {
			name: this.id.toRaw(),
			components: this.components.toRaw(),
			systems: this.systems.toRaw(),
			queries: this.queries.map((query) => query.toRaw()),
			systemDeclarations: this.systemDeclarations.toRaw(),
			globalDeclarations: this.globalDeclarations.toRaw(),
		};
	}

	static readonly fromRaw: FromRaw<RawProject, { id: ProjectId }, Project> = (
		raw,
		{ id },
	) => {
		const locations = new Locations();
		return new Project(
			id,
			locations,
			Components.fromRaw(raw.components ?? [], { locations }),
			Systems.fromRaw(raw.systems ?? []),
			raw.queries
				? raw.queries.map((rawQuery) => Query.fromRaw(rawQuery))
				: undefined,
			SystemDeclarations.fromRaw(raw.systemDeclarations ?? {}),
			GlobalDeclarations.fromRaw(raw.globalDeclarations ?? {}),
		);
	};
}
