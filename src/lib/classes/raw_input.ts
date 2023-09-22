
export type RawLocation = {
  id : string,
  nickname : string,
  invariant : string,
  type : string,
  urgency : string,
  x : number,
  y : number,
  color : string,
  nicknameX : number,
  nicknameY : number,
  invariantX : number,
  invariantY : number
}

export type RawEdge = {
  id : string,
  group : string,
  sourceLocation : string,
  targetLocation : string,
  status : string,
  select : string,
  sync : string,
  guard : string,
  update : string,
  isLocked : boolean,
  nails : {
	x : number,
	y : number,
	propertyType : string,
	propertyX : number,
	propertyY : number,
  }[]
};


export type RawComponent = {
  name : string,
  declarations : string,
  locations : RawLocation[],
  edges : RawEdge[],
  description : string,
  x : number,
  y : number,
  width : number,
  height: number,
  color : string,
  includeInPeriodicCheck : boolean
}


export type RawSystem = {
  name : string,
  description : string,
  x : number,
  y : number,
  width : number,
  height : number,
  color : string,
  systemRootX : number,
  componentInstances : {
	id : number,
	componentName : string,
	x : number,
	y : number
  }[],
  operators : {
	id : number,
	type : string,
	x : number,
	y : number
  }[],
  edges : {
	child : number,
	parent : number
  }[],
}

export type RawQuery = {
  query : string,
  comment : string,
  isPeriodic : boolean,
  ignoredInputs : {}, // Ignored for now
  ignoredOutputs : {}, // Ignored for now
  backend : number
}

export type RawDeclaration = {
  name : string,
  declarations : string
}

