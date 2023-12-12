import {
	comparePortRange,
	validateEndPort,
	validateIP,
	validateName,
	validateStartPort,
} from "./Validation";

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
	set name(setName: string) {
		if (validateName(setName)) this.#name = setName;
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
		if (validateIP(ipAdress)) this.#address = ipAdress;
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
		if (validateStartPort(portStart)) this.#portRangeStart = portStart;
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
		if (
			comparePortRange(this.#portRangeStart, portEnd) &&
			validateEndPort(portEnd)
		)
			this.#portRangeEnd = portEnd;
		else throw new Error("Invalid end port");
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

	hasBeenChanged: boolean = false;

	#useBundle: boolean = false;
	get useBundle(): boolean {
		return this.#useBundle;
	}
	set useBundle(useBundle: boolean) {
		this.#useBundle = useBundle;
		if (useBundle) this.address = "127.0.0.1";
	}

	constructor(
		name: string,
		address: string,
		portRangeStart: number,
		portRangeEnd: number,
		id: number,
		useBundle: boolean,
	) {
		this.name = name;
		if (!useBundle) this.address = address;
		this.portRangeStart = portRangeStart;
		this.portRangeEnd = portRangeEnd;
		this.id = id;
		this.#useBundle = useBundle;
	}

	toJSON() {
		return {
			name: this.#name,
			address: this.#address,
			portRangeStart: this.#portRangeStart,
			portRangeEnd: this.#portRangeEnd,
			id: this.#id,
			useBundle: this.#useBundle,
		};
	}
}
