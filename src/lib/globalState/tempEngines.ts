import type { EngineDTO } from "$lib/components/engineUI/EngineDTO";
import { writable, type Writable } from "svelte/store";

export const tempEngines: Writable<Array<EngineDTO>> = writable([]);