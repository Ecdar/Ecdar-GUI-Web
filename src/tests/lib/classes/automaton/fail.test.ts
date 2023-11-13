import { describe, it, expect } from "vitest";
import { deserializeRaw } from "$lib/classes/jsonAdapter/zodSerializers";
import { ZodRawLocation } from "$lib/classes/automaton/component/raw/RawLocation";

describe("fail test", () => {
	it("fails on missing fields", () => {
		expect(() => deserializeRaw(ZodRawLocation, missingField)).toThrow();
	});

	it("fails on wrong enum", () => {
		expect(() => deserializeRaw(ZodRawLocation, wrongEnum)).toThrow();
	});
});

/*******************************\
 *           DATA              * 
\*******************************/

const missingField = JSON.stringify({
	nickname: "nickname",
	invariant: "invariant",
	type: "INITIAL",
	urgency: "NORMAL",
	x: 140.0,
	y: 100.0,
	color: "7",
	nicknameX: 30.0,
	nicknameY: -10.0,
	invariantY: 10.0,
});

const wrongEnum = JSON.stringify({
	id: "L5",
	nickname: "nickname",
	invariant: "invariant",
	type: "INTIAL",
	urgency: "NOMAL",
	x: 140.0,
	y: 100.0,
	color: "7",
	nicknameX: 30.0,
	nicknameY: -10.0,
	invariantX: 10.0,
	invariantY: 10.0,
});
