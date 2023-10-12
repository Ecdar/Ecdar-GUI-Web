// AUTOMATION TYPES
// Each of the Major Classes are what is the output of loading the ECDAR json files
// Each of the Minor Classes and Enums  are helper classes to the Major Classes
// 
// If a type is Raw, then that is the format of the ECDAR json files
//

// Raw Types
export * as Raw from "./automaton/raw";

// Enums
export { Backend } from "./automaton/Backend";
export { DeclarationType } from "./automaton/DeclarationType";
export { Status } from "./automaton/Status";
export { LocationType } from "./automaton/LocationType";
export { OperatorType } from "./automaton/OperatorType";
export { PropertyType } from "./automaton/PropertyType";
export { Urgency } from "./automaton/Urgency";

// Minor Classes
export { Invariant } from "./automaton/Invariant";
export { Nickname } from "./automaton/Nickname";
export { Operator } from "./automaton/Operator";
export { Property } from "./automaton/Property";
export { SystemEdge } from "./automaton/SystemEdge";
export { ComponentInstance } from "./automaton/ComponentInstance";
export { Nail } from "./automaton/Nail";

// Major Classes
export { Declaration } from "./automaton/Declaration";
export { Component } from "./automaton/Component";
export { Edge } from "./automaton/Edge";
export { Location } from "./automaton/Location";
export { Query, Queries } from "./automaton/Query";
export { System } from "./automaton/System";

// Interfaces
export type { Named } from "./automaton/Named";
