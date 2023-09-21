
import type { 
  RawLocation,
  RawEdge,
  RawComponent,
  RawSystem
} from "./raw_input";


export interface Draw {
}


export interface Serialize {
  serialize : () => string;
}

export type Deserialize<T> = ( input : string) => T;
export type FromRaw<R, T> = (raw : R) => T;
export type ToRaw<R> = () => R;


export class Point {
  x : number;
  y : number;

  constructor(x: number, y:number){
	this.x = x;
	this.y = y;
  }
}


export class Dimentions {
  width : number = 0;
  height : number = 0;

  constructor(width:number, height:number){
	this.width = width;
	this.height = height;
  }
}



export enum LocationType {
  INITIAL = "INITIAL",
  NORMAL = "NORMAL",
  UNIVERSAL = "UNIVERSAL",
  INCONSISTENT = "INCONSISTENT",
  ANY = "ANY"
}


export enum Urgency {
  NORMAL = "NORMAL",
  PROHIBITED = "PROHIBITED",
  URGENT = "URGENT",
  COMMITTED = "COMMITTED"
}


export enum Status {
  INPUT = "INPUT", 
  OUTPUT = "OUTPUT"
}


export enum PropertyType {
  NONE = "NONE",
  SELECTION = "SELECTION",
  GUARD = "GUARD",
  SYNCHRONIZATION = "SYNCHRONIZATION",
  UPDATE = "UPDATE"
}


export enum OperatorType {
  COMPOSITION = "COMPOSITION",
  CONJUNCTION = "CONJUNCTION",
  REFINEMENT = "REFINEMENT",
  QUOTIENT = "QUOTIENT",
  SIMPLE = "SIMPLE"
}


export class Nickname implements Draw {
  name : string;
  position : Point;
  constructor(name : string, position : Point){
	this.name = name;
	this.position = position;
  }
}


export class Invariant {
  fn : string;
  position : Point;
  constructor(fn : string, position : Point){
	this.fn = fn;
	this.position = position;
  }
}


export class Operator implements Draw {
  id : number = 0;
  type : OperatorType = OperatorType.COMPOSITION;
  position : Point = new Point(0,0);

  constructor(id : number = 0, type : OperatorType = OperatorType.COMPOSITION, position : Point = new Point(0,0)) {
	this.id = id;
	this.type = type;
	this.position = position;
  }
}


export class Property {
  type : PropertyType = PropertyType.NONE;
  position : Point = new Point(0,0);
  constructor(type : PropertyType = PropertyType.NONE, position = new Point(0,0)){
	this.type = type;
	this.position = position;
  }
}

export class ComponentInstace {
  id : number;
  name : string;
  position : Point;

  constructor(id : number, name : string, position : Point){
	this.id = id;
	this.name = name;
	this.position = position;
  }
}

export class SystemEdge {
  parent :number;
  child : number;
  constructor(parent : number, child : number) {
	this.parent = parent;
	this.child = child;
  }
}

export class System implements Draw, Serialize{
  name : string;
  description : string;
  position : Point;
  dimentions : Dimentions;
  color : string;
  systemRootX: number;
  componentInstances : ComponentInstace[];
  operators : Operator[];
  edges : SystemEdge[];

  constructor(
	name : string = "",
	description : string = "",
	position : Point = new Point(0,0),
	dimentions : Dimentions = new Dimentions(0,0),
	color : string = "",
	systemRootX : number = 0,
	componentInstances : ComponentInstace[] = [],
	operators : Operator[] = [],
	edges : SystemEdge[] = []
  ) {
	this.name = name;
	this.description = description;
	this.position = position;
	this.dimentions = dimentions;
	this.color = color;
	this.systemRootX = systemRootX;
	this.componentInstances = componentInstances;
	this.operators = operators;
	this.edges = edges;
  }

  
  toRaw : ToRaw<RawSystem> = () => {
	return {
	  name : this.name,
	  description : this.description,
	  x : this.position.x,
	  y : this.position.y,
	  width : this.dimentions.width,
	  height: this.dimentions.height,
	  color : this.color,
	  systemRootX : this.systemRootX,
	  componentInstances : this.componentInstances.map((instance) => {
		return {
		  id : instance.id,
		  componentName : instance.name,
		  x : instance.position.x,
		  y : instance.position.y
		}
	  }),
	  operators : this.operators.map( o => {
		return {
		  x : o.position.x,
		  y : o.position.y,
		  // BECAUSE OF COMPATIBILITY
		  type : o.type.toLowerCase(),
		  id : o.id
		}
	  } ),
	  edges : this.edges.map( e => {
		return {
		  child : e.child,
		  parent : e.parent
		}
	  } )
	}
  }

  serialize (): string {
	return JSON.stringify(this.toRaw())
  }

  static fromRaw : FromRaw<RawSystem, System> = (raw) => {
	return new System(
	  raw.name,
	  raw.description,
	  new Point(raw.x, raw.y),
	  new Dimentions(raw.width, raw.height),
	  raw.color,
	  raw.systemRootX,
	  raw.componentInstances.map((instance) => { 
		return new ComponentInstace(
		  instance.id, 
		  instance.componentName, 
		  new Point(instance.x, instance.y)
		)
	  }),
	  raw.operators.map((o) => { 
		return new Operator(
		  o.id, 
		  /// BECAUSE OF COMPATIBILITY
		  o.type.toUpperCase() as OperatorType, 
		  new Point(o.x, o.y) 
		)
	  }),
	  raw.edges.map((e) => {
		return new SystemEdge(
		  e.parent, 
		  e.child
		)
	  })
	)
  }

  static deserialize : Deserialize<System> = (input) => {
	let raw = JSON.parse(input);
	return System.fromRaw(raw);
  }
}


export class Component implements Draw, Serialize {
  name : string = "";
  declarations : string = "";
  locations : Location[] = [];
  edges : Edge[] = [];
  description : string = "";
  position = new Point(0,0);
  dimentions : Dimentions;
  color : string = "0";
  includeInPeriodicCheck : boolean = false;

  constructor(
	name : string = "", 
	declarations : string = "",
	locations : Location[] = [],
	edges : Edge[] = [],
	description : string = "",
	position = new Point(0,0),
	dimentions = new Dimentions(100, 100),
	color : string = "0",
	includeInPeriodicCheck : boolean = false,
  ){
	this.name = name;
	this.declarations = declarations;
	this.locations = locations;
	this.edges = edges;
	this.description = description;
	this.position = position;
	this.dimentions = dimentions;
	this.color = color;
	this.includeInPeriodicCheck = includeInPeriodicCheck;

  }

  toRaw : ToRaw<RawComponent> = () => {
	return {
	  name : this.name,
	  declarations : this.declarations,
	  locations : this.locations.map((l) => {return l.toRaw()}),
	  edges : this.edges.map((e) => {return e.toRaw()}),
	  description : this.description,
	  x : this.position.x,
	  y : this.position.y,
	  width : this.dimentions.width,
	  height : this.dimentions.height,
	  color : this.color,
	  includeInPeriodicCheck : this.includeInPeriodicCheck
	}
  }

  serialize () : string {
	return JSON.stringify(this.toRaw())
  }

  static fromRaw : FromRaw<RawComponent, Component> = (raw) => {
	return new Component(
	  raw.name,
	  raw.declarations,
	  raw.locations.map((raw) => { return Location.fromRaw(raw)}),
	  raw.edges.map((raw) => { return Edge.fromRaw(raw)}),
	  raw.description,
	  new Point(raw.x, raw.y),
	  new Dimentions(raw.width, raw.height),
	  raw.color,
	  raw.includeInPeriodicCheck
	)
  }
  
  static deserialize : Deserialize<Component> = (input) => {
	let raw : RawComponent = JSON.parse(input);
	return Component.fromRaw(raw);
  }
}


export class Location implements Draw, Serialize{
  id : string;
  position : Point; 
  nickname : Nickname;
  invariant: Invariant;
  type : LocationType;
  urgency : Urgency;
  color : string;

  constructor(
	id : string = "",
	position : Point = new Point(0,0),
	nickname : Nickname = new Nickname("", new Point(0,0)),
	invariant : Invariant = new Invariant("", new Point(0,0)),
	type : LocationType = LocationType.NORMAL,
	urgency : Urgency = Urgency.NORMAL,
	color : string = "" 
  ){
	this.id = id;
	this.position = position;
	this.nickname = nickname;
	this.invariant = invariant;
	this.type = type;
	this.urgency = urgency;
	this.color = color;
  }

  toRaw : ToRaw<RawLocation> = () => {
	return {
	  id : this.id,
	  nickname : this.nickname.name,
	  invariant : this.invariant.fn,
	  type : this.type,
	  urgency : this.urgency,
	  x : this.position.x,
	  y : this.position.y,
	  color : this.color,
	  nicknameX : this.nickname.position.x,
	  nicknameY : this.nickname.position.y,
	  invariantX : this.invariant.position.x,
	  invariantY : this.invariant.position.y
	} 
  }
  
  serialize (): string {
	return JSON.stringify(this.toRaw())
  }

  static fromRaw : FromRaw<RawLocation, Location> = (raw) => {
	return new Location(
	  raw.id,
	  new Point(raw.x, raw.y),
	  new Nickname(raw.nickname, new Point(raw.nicknameX, raw.nicknameY)),
	  new Invariant(raw.invariant, new Point(raw.invariantX, raw.invariantY)),
	  raw.type as LocationType,
	  raw.urgency as Urgency,
	  raw.color
	);

  }
  static deserialize : Deserialize<Location> = (input) => {
	let raw : RawLocation = JSON.parse(input);
	return Location.fromRaw(raw);
  }
}


export class Edge implements Draw, Serialize {
  id : string;
  group : string;
  sourceLocation : string;
  targetLocation : string;
  status : Status;
  select : string;
  guard : string;
  update : string;
  sync : string;
  isLocked : boolean;
  nails : {
	position : Point,
	property : Property
  }[];

  constructor(
	id : string = "",
	group : string = "",
	sourceLocation : string = "",
	targetLocation : string = "",
	status : Status = Status.INPUT,
	select : string = "",
	guard : string = "",
	update : string = "",
	sync : string = "",
	isLocked : boolean = true,
	nails : {
	  position : Point,
	  property : Property,
	}[] = []
  ) {
	this.id = id;
	this.group = group;
	this.sourceLocation = sourceLocation;
	this.targetLocation = targetLocation;
	this.status = status;
	this.select = select;
	this.guard = guard;
	this.update = update;
	this.sync = sync;
	this.isLocked = isLocked;
	this.nails = nails;
  }

  toRaw : ToRaw<RawEdge> = () => {
	return {
	  id : this.id,
	  group : this.group,
	  sourceLocation : this.sourceLocation,
	  targetLocation : this.targetLocation,
	  status : this.status as string,
	  select : this.select,
	  guard : this.guard,
	  update : this.update,
	  sync : this.sync,
	  isLocked : this.isLocked,
	  nails : this.nails.reduce((res, c) => { 
		res.push({
		  x : c.position.x,
		  y : c.position.y,
		  propertyType : c.property.type,
		  propertyX : c.property.position.x,
		  propertyY: c.property.position.y,
		}); 
		return res 
	  }, <RawEdge["nails"]>[]),
	}
  }
  serialize (): string {
	return JSON.stringify(this.toRaw());
  }
  
  static fromRaw : FromRaw<RawEdge, Edge> = (raw) => {
	return new Edge(
	  raw.id,
	  raw.group,
	  raw.sourceLocation,
	  raw.targetLocation,
	  raw.status as Status,
	  raw.select,
	  raw.guard,
	  raw.update,
	  raw.sync,
	  raw.isLocked,
	  raw.nails.map((nail) => { return {
		position : new Point(nail.x, nail.y),
		property : new Property(
		  nail.propertyType as PropertyType, 
		  new Point(nail.propertyX, nail.propertyY)
		),
	  }})
	);
	
  }
  static deserialize : Deserialize<Edge> = (input) => {
	let raw : RawEdge = JSON.parse(input);
	return Edge.fromRaw(raw);
  }
}

