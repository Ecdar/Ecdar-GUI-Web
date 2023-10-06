import * as Automata from "../automaton";
import type { Features, HasFeatures } from "./features/Feature";

export const PROJECT_FOLDER_NAME_SYSTEMS = "Systems";
export const PROJECT_FOLDER_NAME_COMPONENTS = "Components";
export const PROJECT_FILE_NAME_QUERIES = "Queries.json";
export const PROJECT_FILE_NAME_SYSTEM_DECLARATIONS = "SystemDeclarations.json";
export const PROJECT_FILE_NAME_GLOBAL_DECLARATIONS = "GlobalDeclarations.json";

export class Project implements HasFeatures, Automata.Named {
	/**
	 * The name of the project, and the name of the save folder
	 * */
	name: string;

	/**
	 * All components in the project
	 * */
	components: Automata.Component[];

	/**
	 * All systems in the project
	 * */
	systems: Automata.System[];

	/**
	 * All queries of the project
	 * */
	queries: Automata.Queries;

	/**
	 * The system declaration of the project
	 * */
	systemDeclarations: Automata.Declaration;

	/**
	 * The global declarations of the project
	 * */
	globalDeclarations: Automata.Declaration;

	/**
	* List of optional features this project
	* */
	readonly features: Features = {};

	constructor(
		name = "New Project",
		components: Automata.Component[] = [],
		systems: Automata.System[] = [],
		queries = new Automata.Queries(),
		systemDeclarations = new Automata.Declaration(
			Automata.DeclarationType.SYSETEM,
		),
		globalDeclarations = new Automata.Declaration(
			Automata.DeclarationType.GLOBAL,
		),
	) {
		this.name = name;
		this.components = components;
		this.systems = systems;
		this.queries = queries;
		this.systemDeclarations = systemDeclarations;
		this.globalDeclarations = globalDeclarations;
	}

	/**
	 * Creates a new project
	 * */
	static create(
		name?: string,
		components?: Automata.Component[],
		systems?: Automata.System[],
		queries?: Automata.Queries,
		systemDeclarations?: Automata.Declaration,
		globalDeclarations?: Automata.Declaration,
	) {
		return new Project(
			name,
			components,
			systems,
			queries,
			systemDeclarations,
			globalDeclarations,
		);
	}

	/**
	* OPTIONAL:
	* Loads a project from disk
	* */
	static readonly load? : () => Promise<Project>  = undefined
}
