import type { Engine } from "$lib/classes/engine/Engine";

/**
 * A data transfer object for the Engine class
 */
export type EngineDTO = Omit<InstanceType<typeof Engine>, "toJSON">;
