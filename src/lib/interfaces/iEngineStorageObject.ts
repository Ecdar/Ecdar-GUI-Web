import type { Engine } from "$lib/classes/engine/Engine";

export default interface IEngineStorageObject {
	engineArray: Array<Engine>;
	engineId: number;
	defaultEngine?: Engine;
}
