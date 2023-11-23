import { describe, it, expect } from "vitest";
import GlobalCssSchemesLoader from "$lib/classes/styling/GlobalCssSchemesLoader";

describe("CSS loader tests", () => {
	it("has no access to the Window element", () => {
		expect(() => {
			new GlobalCssSchemesLoader();
		}).toThrowError(
			"The CSS loader needs access to the window and DOM elements",
		);
	});
});
