import type * as Automata from "../automaton";
import type { HasFeatures } from "./features/Feature";

export const PROJECT_FOLDER_NAME_SYSTEMS = "Systems";
export const PROJECT_FOLDER_NAME_COMPONENTS = "Components";
export const PROJECT_FILE_NAME_QUERIES = "Queries.json";
export const PROJECT_FILE_NAME_SYSTEM_DECLARATIONS = "SystemDeclarations.json";
export const PROJECT_FILE_NAME_GLOBAL_DECLARATIONS = "GlobalDeclarations.json";

export interface Project extends HasFeatures {
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
}
