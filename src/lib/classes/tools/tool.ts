

export class Tool {
	_name: string = "Default";


	onClick(/*Component*/) {
        /*fix this christian*/ 
	}


	//Get set name
	get name(): string {
		return this._name;
	}
	set name(name: string) {
		if (!name) {
			throw new Error("Invalid name");
		}
		this._name = name;
	}
	
	constructor(name: string) {
		this._name = name;
	}
}
