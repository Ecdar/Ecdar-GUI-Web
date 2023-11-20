import { describe, it, expect } from "vitest";
import GlobalCssSchemesLoader from "$lib/classes/styling/GlobalCssSchemesLoader";

describe("Throw New Error", () => {
	it("No Window", () => {
		expect(() => {
			new GlobalCssSchemesLoader();
		}).toThrowError(
			"The CSS loader needs access to the window and DOM elements",
		);
	});
});
