
import { describe, it, expect } from 'vitest';
import { Location, Edge, Component, System } from './automaton';
import type { RawLocation, RawEdge, RawComponent, RawSystem } from './raw_input.ts';
import * as _ from "lodash";

describe('Location test', () => {
  it('serializes into location', () => {
	let location = Location.deserialize(locationData);
	let raw : RawLocation  = JSON.parse(locationData);
	expect(location.id).toBe(raw.id);
	expect(location.urgency).toBe(raw.urgency);
	expect(location.color).toBe(raw.color);
	expect(location.position.x).toBe(raw.x);
	expect(location.position.y).toBe(raw.y);
	expect(location.type).toBe(raw.type);
	expect(location.nickname.name).toBe(raw.nickname);
	expect(location.nickname.position.x).toBe(raw.nicknameX);
	expect(location.nickname.position.y).toBe(raw.nicknameY);
	expect(location.invariant.fn).toBe(raw.invariant);
	expect(location.invariant.position.x).toBe(raw.invariantX);
	expect(location.invariant.position.y).toBe(raw.invariantY);
  });

  it('serializes and deserializes to the same object', () => {
	let o = Location.deserialize(locationData);
	let rawObj = o.toRaw();
	let rawParse = JSON.parse(locationData);
	expect(_.isEqual(rawObj, rawParse)).toBe(true);
  })
});

describe('Edge test', () => {
  it('serializes into an Edge', () => {
	let edge = Edge.deserialize(edgeData);
	let data : RawEdge = JSON.parse(edgeData);
	expect(edge.id).toBe(data.id);
	expect(edge.sync).toBe(data.sync);
	expect(edge.group).toBe(data.group);
	expect(edge.guard).toBe(data.guard);
	expect(edge.select).toBe(data.select);
	expect(edge.status).toBe(data.status);
	expect(edge.update).toBe(data.update);
	expect(edge.isLocked).toBe(data.isLocked);
	expect(edge.sourceLocation).toBe(data.sourceLocation);
	expect(edge.targetLocation).toBe(data.targetLocation);
	expect(edge.nails.length).toBe(data.nails.length);
	expect(edge.nails[0].position.x).toBe(data.nails[0].x);
	expect(edge.nails[0].position.y).toBe(data.nails[0].y);
	expect(edge.nails[0].property.type).toBe(data.nails[0].propertyType);
	expect(edge.nails[0].property.position.x).toBe(data.nails[0].propertyX);
	expect(edge.nails[0].property.position.y).toBe(data.nails[0].propertyY);
  })

  it('serializes and deserializes to the same object', () => {
	let o = Edge.deserialize(edgeData);
	let rawObj = o.toRaw();
	let rawParse = JSON.parse(edgeData);
	expect(_.isEqual(rawObj, rawParse)).toBe(true);
  })
})


describe('Component test', () => {
  it('serializes into a Component', () => {
	let component = Component.deserialize(componentData);
	let data : RawComponent = JSON.parse(componentData);
	expect(component.name).toBe(data.name);
	expect(component.declarations).toBe(data.declarations);
	expect(component.locations.length).toBe(data.locations.length);
	expect(component.edges.length).toBe(data.edges.length);
	expect(component.description).toBe(data.description);
	expect(component.position.x).toBe(data.x);
	expect(component.position.y).toBe(data.y);
	expect(component.dimentions.width).toBe(data.width);
	expect(component.dimentions.height).toBe(data.height);
	expect(component.color).toBe(data.color);
	expect(component.includeInPeriodicCheck).toBe(data.includeInPeriodicCheck);
  })

  it('serializes and deserializes to the same object', () => {
	let o = Component.deserialize(componentData);
	let rawObj = o.toRaw();
	let rawParse = JSON.parse(componentData);
	expect(_.isEqual(rawObj, rawParse)).toBe(true);
  })
})

describe('System test', () => {
  it('serializes into a system', () => {
	let system = System.deserialize(systemData);
	let data : RawSystem = JSON.parse(systemData);
	expect(system.name).toBe(data.name);
	expect(system.description).toBe(data.description);
	expect(system.position.x).toBe(data.x);
	expect(system.position.y).toBe(data.y);
	expect(system.color).toBe(data.color);
	expect(system.systemRootX).toBe(data.systemRootX);
	expect(system.componentInstances.length).toBe(data.componentInstances.length);
	expect(system.componentInstances[0].name).toBe(data.componentInstances[0].componentName);
	expect(system.componentInstances[0].id).toBe(data.componentInstances[0].id);
	expect(system.componentInstances[0].position.x).toBe(data.componentInstances[0].x);
	expect(system.componentInstances[0].position.y).toBe(data.componentInstances[0].y);
	expect(system.operators.length).toBe(data.operators.length);
	expect(system.operators[0].id).toBe(data.operators[0].id);
	expect(system.operators[0].position.x).toBe(data.operators[0].x);
	expect(system.operators[0].position.y).toBe(data.operators[0].y);
	expect(system.operators[0].type.toLowerCase()).toBe(data.operators[0].type);
	expect(system.edges.length).toBe(data.edges.length);
	expect(system.edges[0].parent).toBe(data.edges[0].parent);
	expect(system.edges[0].child).toBe(data.edges[0].child);
  })

  it('serializes and deserializes to the same object', () => {
	let o = System.deserialize(systemData);
	let rawObj = o.toRaw();
	let rawParse = JSON.parse(systemData);
	expect(_.isEqual(rawObj, rawParse)).toBe(true);
  })
})



/*******************************\
 *           DATA              * 
\*******************************/


let locationData = `
{
  "id": "L5",
  "nickname": "nickname",
  "invariant": "invariant",
  "type": "INITIAL",
  "urgency": "NORMAL",
  "x": 140.0,
  "y": 100.0,
  "color": "7",
  "nicknameX": 30.0,
  "nicknameY": -10.0,
  "invariantX": 20.0,
  "invariantY": 10.0
}
`

let edgeData = `
{
  "id": "E20",
  "group": "group",
  "sourceLocation": "L19",
  "targetLocation": "L8",
  "status": "OUTPUT",
  "select": "select",
  "guard": "y \u003e\u003d 4",
  "update": "update",
  "sync": "cof",
  "isLocked": false,
  "nails": [
	{
	  "x": 150.0,
	  "y": 380.0,
	  "propertyType": "GUARD",
	  "propertyX": -60.0,
	  "propertyY": -10.0
	},
	{
	  "x": 156.0,
	  "y": 350.0,
	  "propertyType": "SYNCHRONIZATION",
	  "propertyX": -50.0,
	  "propertyY": -20.0
	}
  ]
}
`

let componentData = `
{
  "name": "Machine",
  "declarations": "clock y;",
  "locations": [
    {
      "id": "L4",
      "nickname": "",
      "invariant": "y\u003c\u003d6",
      "type": "NORMAL",
      "urgency": "NORMAL",
      "x": 140.0,
      "y": 300.0,
      "color": "7",
      "nicknameX": 30.0,
      "nicknameY": -10.0,
      "invariantX": 30.0,
      "invariantY": -10.0
    },
    {
      "id": "L5",
      "nickname": "",
      "invariant": "",
      "type": "INITIAL",
      "urgency": "NORMAL",
      "x": 140.0,
      "y": 100.0,
      "color": "7",
      "nicknameX": 30.0,
      "nicknameY": -10.0,
      "invariantX": 30.0,
      "invariantY": 10.0
    }
  ],
  "edges": [
    {
      "id": "E25",
      "group": "",
      "sourceLocation": "L4",
      "targetLocation": "L5",
      "status": "OUTPUT",
      "select": "",
      "guard": "y\u003e\u003d4",
      "update": "",
      "sync": "cof",
      "isLocked": false,
      "nails": [
        {
          "x": 100.0,
          "y": 230.0,
          "propertyType": "GUARD",
          "propertyX": -70.0,
          "propertyY": -10.0
        },
        {
          "x": 100.0,
          "y": 180.0,
          "propertyType": "SYNCHRONIZATION",
          "propertyX": -70.0,
          "propertyY": -10.0
        }
      ]
    },
    {
      "id": "E26",
      "group": "",
      "sourceLocation": "L4",
      "targetLocation": "L5",
      "status": "OUTPUT",
      "select": "",
      "guard": "",
      "update": "",
      "sync": "tea",
      "isLocked": false,
      "nails": [
        {
          "x": 210.0,
          "y": 200.0,
          "propertyType": "SYNCHRONIZATION",
          "propertyX": 20.0,
          "propertyY": -10.0
        }
      ]
    },
    {
      "id": "E27",
      "group": "",
      "sourceLocation": "L5",
      "targetLocation": "L4",
      "status": "INPUT",
      "select": "",
      "guard": "",
      "update": "y\u003d0",
      "sync": "coin",
      "isLocked": false,
      "nails": [
        {
          "x": 140.0,
          "y": 220.0,
          "propertyType": "SYNCHRONIZATION",
          "propertyX": 20.0,
          "propertyY": -10.0
        },
        {
          "x": 140.0,
          "y": 190.0,
          "propertyType": "UPDATE",
          "propertyX": 10.0,
          "propertyY": -10.0
        }
      ]
    },
    {
      "id": "E28",
      "group": "",
      "sourceLocation": "L4",
      "targetLocation": "L4",
      "status": "INPUT",
      "select": "",
      "guard": "",
      "update": "",
      "sync": "coin",
      "isLocked": false,
      "nails": [
        {
          "x": 130.0,
          "y": 350.0,
          "propertyType": "SYNCHRONIZATION",
          "propertyX": -60.0,
          "propertyY": -10.0
        },
        {
          "x": 160.0,
          "y": 350.0,
          "propertyType": "NONE",
          "propertyX": 0.0,
          "propertyY": 0.0
        }
      ]
    },
    {
      "id": "E29",
      "group": "g",
      "sourceLocation": "L5",
      "targetLocation": "L5",
      "status": "OUTPUT",
      "select": "s",
      "guard": "y\u003e\u003d2",
      "update": "u",
      "sync": "tea",
      "isLocked": false,
      "nails": [
        {
          "x": 170.0,
          "y": 60.0,
          "propertyType": "GUARD",
          "propertyX": 10.0,
          "propertyY": -20.0
        },
        {
          "x": 140.0,
          "y": 60.0,
          "propertyType": "SYNCHRONIZATION",
          "propertyX": -20.0,
          "propertyY": -30.0
        }
      ]
    }
  ],
  "description": "",
  "x": 6.0,
  "y": 5.0,
  "width": 300.0,
  "height": 390.0,
  "color": "7",
  "includeInPeriodicCheck": false
}
`

let systemData = `
{
  "name": "UniversityExample",
  "description": "da",
  "x": 4.0,
  "y": 5.0,
  "width": 540.0,
  "height": 410.0,
  "color": "5",
  "systemRootX": 240.0,
  "componentInstances": [
    {
      "id": 1,
      "componentName": "Machine",
      "x": 10.0,
      "y": 110.0
    },
    {
      "id": 3,
      "componentName": "Researcher",
      "x": 310.0,
      "y": 110.0
    },
    {
      "id": 5,
      "componentName": "HalfAdm1",
      "x": 10.0,
      "y": 280.0
    },
    {
      "id": 6,
      "componentName": "HalfAdm2",
      "x": 310.0,
      "y": 280.0
    }
  ],
  "operators": [
    {
      "id": 2,
      "type": "composition",
      "x": 250.0,
      "y": 60.0
    },
    {
      "id": 4,
      "type": "conjunction",
      "x": 224159.0,
      "y": 21523.0
    },
    {
      "id": 232,
      "type": "refinement",
      "x": 21453.0,
      "y": 2315.0
    },
    {
      "id": 1003,
      "type": "quotient",
      "x": 2252.0,
      "y": 241.0
    },
    {
      "id": 10,
      "type": "simple",
      "x": 223123.0,
      "y": 2.0
	}
  ],
  "edges": [
    {
      "child": 2,
      "parent": 0
    },
    {
      "child": 1,
      "parent": 2
    },
    {
      "child": 3,
      "parent": 2
    },
    {
      "child": 4,
      "parent": 2
    },
    {
      "child": 5,
      "parent": 4
    },
    {
      "child": 6,
      "parent": 4
    }
  ]
}
`

