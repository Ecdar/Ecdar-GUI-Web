import { EngineType } from "./EngineType";

/**
 * A Reveaal, JEcdar andd API engine definition
 * It stores the IP and port of an engine
 * */
export class Engine {
	/**
	 * The #name of the Engine
	 * */
	#name: string = "";
	get name(): string {
		return this.#name;
	}
	set name(setName: string | undefined) {
		if (setName != "" && setName !== undefined) this.#name = setName;
		else throw new Error("Engine must have a name");
	}
	/**
	 * The IP #address of the engine
	 * */
	#address: string = "";
	get address(): string {
		return this.#address;
	}
	set address(ipAdress: string) {
		const regexTest: RegExp = new RegExp(
			"^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?).(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$",
		);
		if (regexTest.test(ipAdress)) this.#address = ipAdress;
		else throw new Error(ipAdress + " Is an invalid IP address");
	}
	/**
	 * The starting number of the portrange
	 * */
	#portRangeStart: number = 0;
	get portRangeStart(): number {
		return this.#portRangeStart;
	}
	set portRangeStart(portStart: number) {
		if (0 <= portStart && portStart <= 65352)
			this.#portRangeStart = portStart;
		else throw new Error("Invalid start port");
	}

	/**
	 * The last number of the portrange
	 * */
	#portRangeEnd: number = 0;
	get portRangeEnd(): number {
		return this.#portRangeEnd;
	}
	set portRangeEnd(portEnd: number) {
		if (this.portRangeStart <= portEnd && portEnd <= 65353)
			this.#portRangeEnd = portEnd;
		else throw new Error("Invalid end port");
	}

	/**
	 * type of engine
	 * */
	#type: EngineType = 0;
	get type(): EngineType {
		return this.#type;
	}
	set type(engineType: EngineType) {
		if (engineType in EngineType) this.#type = engineType;
		else throw new Error("Invalid engine #type");
	}

	/**
	 * Unique identifier
	 * */
	#id: number = 0;
	get id(): number {
		return this.#id;
	}
	set id(inputId: number) {
		if (inputId >= 0) this.#id = inputId;
		else throw new Error("Invalid id");
	}

	constructor(
		name: string,
		address: string,
		portRangeStart: number,
		portRangeEnd: number,
		type: EngineType,
		id: number,
	) {
		this.name = name;
		this.address = address;
		this.portRangeStart = portRangeStart;
		this.portRangeEnd = portRangeEnd;
		this.type = type;
		this.id = id;
	}

	toJSON() {
		return {
			name: this.#name,
			address: this.#address,
			portRangeStart: this.#portRangeStart,
			portRangeEnd: this.#portRangeEnd,
			type: this.#type,
			id: this.#id,
		};
	}
}
