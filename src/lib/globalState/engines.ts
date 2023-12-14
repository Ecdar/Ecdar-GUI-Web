import type { EngineDTO } from "$lib/components/engineUI/EngineDTO";
import { writable, type Writable } from "svelte/store";

export const engineStore: Writable<Array<EngineDTO>> = writable<
	Array<EngineDTO>
>([]);
