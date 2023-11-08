/**
 * AUTOMATON TYPES
 * Each of the Major Classes are what is the output of loading the ECDAR json files
 * Each of the Minor Classes and Enums are helper classes to the Major Classes
 */

// Component classes
export { Component } from "./automaton/component/Component";
export { LocationEdge } from "./automaton/component/LocationEdge";
export { Location } from "./automaton/component/Location";
export { Invariant } from "./automaton/component/Invariant";
export { Nickname } from "./automaton/component/Nickname";
export { NailProperty } from "./automaton/component/NailProperty";
export { LocationEdgeNail } from "./automaton/component/LocationEdgeNail";

// Component helpers
export { LocationEdgeStatus } from "./automaton/component/LocationEdgeStatus";
export { LocationType } from "./automaton/component/LocationType";
export { NailPropertyType } from "./automaton/component/NailPropertyType";
export { LocationUrgency } from "./automaton/component/LocationUrgency";

// System classes
export { System } from "./automaton/system/System";
export { ComponentInstance } from "./automaton/system/ComponentInstance";
export { Operator } from "./automaton/system/Operator";
export { SystemMemberEdge } from "./automaton/system/SystemMemberEdge";

// System helpers
export { OperatorType } from "./automaton/system/OperatorType";

// General Classes
export { SystemDeclarations } from "./automaton/SystemDeclarations";
export { GlobalDeclarations } from "./automaton/GlobalDeclarations";
export { Query } from "./automaton/Query";
export { Project } from "./automaton/Project";
export { Position } from "./automaton/Position";
export { Dimensions } from "./automaton/Dimensions";

// General helpers
export { Backend } from "./automaton/Backend";
