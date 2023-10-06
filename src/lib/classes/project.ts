/*
 * HOW TO ADD BEHAVIOR DEPENDING ON BROWSER SUPPORT
 *
 * CURRENTLY IMPLEMENTED
 *   For Tauri in class TauriProject
 *   For browsers supporting webkitdirectory in class WebkitDirProject
 *
 * Create a class that extends the project class
 *   MUST : override the create function to create the class
 *   MUST : add the class to the feature check at the bottom of this file
 *   OPTIONAL: Add the features that is needed
 *	  - check ($lin/project/features/Features.ts) for more information
 *	OPTIONAL: override the load function if it should support loading from disk (or file)
 * */

import { inTauri } from "$lib/tauri";
import type { Project } from "./project/Project";
import { TauriProject } from "./project/adapters/TauriProject";
import { WebkitDirProject } from "./project/adapters/WebkitDirProject";

// Enums
export type { ProjectError } from "./project/ProjectError";

// Major classes
export const {
	/** Loads a saved project */
	load,
	/** Creates a new project */
	create,
}: {
	load?: () => Promise<Project>;
	create: () => Project;
} = inTauri ? TauriProject : WebkitDirProject;
