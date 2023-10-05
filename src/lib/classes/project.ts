import type * as Automata from "$lib/classes/automaton";
import { inTauri } from "$lib/tauri";
import type { Project } from "./project/Project";
import { DefaultProject } from "./project/adapters/DefaultProject";
import { TauriProject } from "./project/adapters/TauriProject";

// Enums
export type { ProjectError } from "./project/ProjectError";

// Major classes
export const { 
  /** Loads a saved project */
  load, 
  /** Creates a new project */
  create 
} : { 
  load : () => Promise<Project> ,
  create : () => Project
} = inTauri ? TauriProject : DefaultProject

