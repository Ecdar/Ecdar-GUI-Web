import type { Engine } from "$lib/classes/engine/Engine";

export interface iEngineStorageObject {
	engineArray: Array<Engine>;
	engineId: number;
	defaultEngine?: Engine;
}
