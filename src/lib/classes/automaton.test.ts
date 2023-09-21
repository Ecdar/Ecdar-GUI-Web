
import { describe, it, expect } from 'vitest';
import { Location, Edge } from './automaton';
import type { RawLocation, RawEdge } from './raw_input.ts';

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




