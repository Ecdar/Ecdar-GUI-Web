import {EngineType} from "./EngineTypes"

/**
 * A Reveaal, JEcdar andd API engine definition
 * It stores the IP and port of an engine
 * */
export class Engine
{
	/**
	 * The name of the Engine
	 * */
	private name: string = "";
	get Name(): string {
		return this.name;
	}
	set Name(name: string){
		if(name != "")
			this.name = name;
		else
			throw new Error("Enigne must have a name");
		
	}
	/**
	 * The IP address of the engine
	 * */
	private address: string = "";
	get Address(): string{
		return this.address;
	}
	set Address(ipAdress: string){
		const regexTest: RegExp = new RegExp('^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$');
		console.log(regexTest.test(ipAdress))
		if(regexTest.test(ipAdress))
			this.address = ipAdress
		else
			throw new Error(ipAdress +" Is an invalid IP address");
	}
	/**
	 * The starting number of the portrange
	 * */
	private portRangeStart: number = 0;
	get PortRangeStart() : number{
		return this.portRangeStart;
	} 
	set PortRangeStart(portStart: number){
		if(0 <= portStart && portStart <= 65352)
			this.portRangeStart = portStart;
		else
			throw new Error("Invalid start port");
	}

	/**
	 * The last number of the portrange
	 * */
	private portRangeEnd: number = 0;
	get PortRangeEnd(): number{
		return this.portRangeEnd;
	}
	set PortRangeEnd(portEnd: number){
		if(this.PortRangeStart <= portEnd && portEnd <= 65353)
			this.portRangeEnd = portEnd;
		else
			throw new Error("Invalid end port");
	}

	/**
	 * Type of engine
	 * */
	private type: EngineType = 0;
	get Type(): EngineType{
		return this.type
	}  
	set Type(engineType: EngineType){
		if(engineType in EngineType)
			this.type = engineType;
		else
			throw new Error("Invalid engine type");
	}

	/**
 	* Unique identifier
 	* */
	private id: number = 0;
	get Id(): number{
		return this.id;
	}
	set Id(inputId: number){
		if(inputId >= 0)
			this.id = inputId;
		else
			throw new Error("Invalid Id");
		
	}

	constructor(
		name: string,
		address: string,
	    portRangeStart: number,
	    portRangeEnd: number,
	    type: EngineType,
		id: number,  
	) {
		this.Name = name;
		this.Address = address;
		this.PortRangeStart = portRangeStart;
		this.PortRangeEnd = portRangeEnd;
		this.Type = type;
		this.Id = id;
	}

}
