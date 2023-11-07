import type { Engine } from "$lib/classes/engine/Engine";

export type EngineDTO = Omit<InstanceType<typeof Engine>, "toJSON">;
