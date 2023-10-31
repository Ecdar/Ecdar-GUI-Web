import type {EngineType} from "./EngineTypes"

/**
 * # A Reveaal, JEcdar og API engine definition
 * It stores the IP and port of an engine
 * */
export class Engine
{
	/**
	 * The name of the Engine
	 * */
	name: string = "";

	/**
	 * The IP address of the engine
	 * */
	address: string = "";

	/**
	 * The starting number of the portrange
	 * */
	portRangeStart: number = 0;

	/**
	 * The last number of the portrange
	 * */
	portRangeEnd: number = 0;

	/**
	 * Type of engine
	 * */
	type: EngineType;  

	/**
	 * Unique identifier
	 * */
	 id: number; 

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
}
