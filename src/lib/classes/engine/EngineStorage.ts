import type IEngineStorageObject from "$lib/interfaces/IEngineStorageObject";
import { Engine } from "./Engine";
import type { EngineType } from "./EngineType";
/**
 * Engine storage definition.
 * Stores an array of Engine instances, and can create, delete or search the array
 * */
class EngineStorage {
	/**
	 * Array of engines defined
	 * */
	engineArray: Array<Engine> = [];

	/**
	 * variable used to give unique id to engines
	 * */
	#engineId: number = 0;

	get engineId(): number {
		return (this.engineId = ++this.#engineId); //auto inc
	}
	set engineId(id: number) {
		if (id >= 0) this.#engineId = id;
		else throw new Error("Invalid engineId");
	}

	/**
	 * Array of engines defined
	 * */
	#defaultEngine: Engine | undefined;
	get defaultEngine(): Engine | undefined {
		return this.#defaultEngine;
	}
	set defaultEngine(engine: Engine | undefined) {
		let index = -1;

		index = this.engineArray.findIndex((engine: Engine) => {
			return engine.id === engine.id;
		});
		if (engine === undefined || index > -1) this.#defaultEngine = engine;
		else throw new Error("Failed to set default engine");
	}

	constructor() {
		this.engineArray = new Array<Engine>();
		this.engineId = 0;
		this.defaultEngine = undefined;
	}

	/**
	 * Create an Engine and pushes it to engineArray
	 */
	createEngine(
		name: string,
		address: string,
		portRangeStart: number,
		portRangeEnd: number,
		type: EngineType,
	) {
		const newEngine = new Engine(
			name,
			address,
			portRangeStart,
			portRangeEnd,
			type,
			this.engineId,
		);
		this.engineArray.push(newEngine);
	}

	/**
	 * Deletes the engine with the given id
	 */
	deleteEngine(id: number) {
		const engineIndex: number = this.engineArray.findIndex(
			(engine: Engine) => {
				return engine.id === id;
			},
		);
		//check for results
		if (engineIndex > -1) {
			//Check if the default engine is being removed
			if (this.defaultEngine === this.engineArray[engineIndex])
				this.defaultEngine = undefined;

			this.engineArray.splice(engineIndex, 1);
		} else {
			throw new Error("Engine Id does not exist");
		}
	}
	/**
	 * Get engines based on id or name
	 */
	getEngine(identifier: number | string): Engine {
		let returnEngine: undefined | Engine;

		//Find engine based on id
		if (typeof identifier === "number") {
			returnEngine = this.engineArray.find((engine: Engine) => {
				return engine.id === identifier;
			});
		}
		//Find engine based on name
		else {
			returnEngine = this.engineArray.find((engine: Engine) => {
				return engine.name === identifier;
			});
		}
		if (returnEngine !== undefined) return returnEngine;
		else throw new Error("Could not find engine");
	}

	/**
	 * Returns all engines in the store in the form of an array
	 */
	getEngineArray(): Engine[] {
		return this.engineArray;
	}

	/**
	 * Coonvert the EngineStorage to a JSON string
	 */
	serialize(): string {
		return JSON.stringify(this);
	}

	toJSON() {
		return {
			engineArray: this.engineArray,
			engineId: this.#engineId,
			defaultEngine: this.defaultEngine,
		};
	}

	/**
	 * Reads fields and engines from JSON string, and applies them in the store
	 */
	deSerialize(json: string) {
		const parsedJSON: IEngineStorageObject = JSON.parse(
			json,
		) as IEngineStorageObject;
		this.engineArray = [];
		this.engineId = parsedJSON.engineId;
		this.defaultEngine = parsedJSON.defaultEngine;

		//run Engine constructer to validate input.
		parsedJSON.engineArray.forEach((engine) => {
			this.engineArray.push(
				new Engine(
					engine.name,
					engine.address,
					engine.portRangeStart,
					engine.portRangeEnd,
					engine.type,
					engine.id,
				),
			);
		});
	}
}
const engineStorage = new EngineStorage();
export default engineStorage;
