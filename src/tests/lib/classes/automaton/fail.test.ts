import { describe, it, expect } from "vitest";
import {
	Location,
} from "$lib/classes/automaton";

describe("fail test", () => {
	it("fails on missing fields", () => {
	  expect(() => Location.deserializeRaw(missingField)).toThrow()
	});

	it("fails on wrong enum", () => {
	  expect(() => Location.deserializeRaw(wrongEnum)).toThrow()
	});
});

/*******************************\
 *           DATA              * 
\*******************************/


const missingField= `
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
  "invariantY": 10.0
}
`;

const wrongEnum= `
{
  "id": "L5",
  "nickname": "nickname",
  "invariant": "invariant",
  "type": "INTIAL",
  "urgency": "NOMAL",
  "x": 140.0,
  "y": 100.0,
  "color": "7",
  "nicknameX": 30.0,
  "nicknameY": -10.0,
  "invariantX": 10.0
  "invariantY": 10.0
}
`;








