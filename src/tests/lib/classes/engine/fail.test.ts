import { describe, it, expect } from "vitest";
import EngineStorage from "$lib/classes/engine/EngineStorage";
import type { Engine } from "$lib/classes/engine/Engine";

describe("fail engine test", () => {
	// Missing fields
	it("fails on missing name", () => {
		const obj = {
			engineArray: [missingName],
			engineId: 2,
			defaultEngine: undefined,
		};
		expect(() => {
			EngineStorage.deSerialize(JSON.stringify(obj));
		}).toThrow();
	});

	it("fails on missing address", () => {
		const obj = {
			engineArray: [missingAddress],
			engineId: 2,
			defaultEngine: undefined,
		};
		expect(() => {
			EngineStorage.deSerialize(JSON.stringify(obj));
		}).toThrow();
	});

	it("fails on missing port range start", () => {
		const obj = {
			engineArray: [missingPortStart],
			engineId: 2,
			defaultEngine: undefined,
		};
		expect(() => {
			EngineStorage.deSerialize(JSON.stringify(obj));
		}).toThrow();
	});

	it("fails on missing port range end", () => {
		const obj = {
			engineArray: [missingPortEnd],
			engineId: 2,
			defaultEngine: undefined,
		};
		expect(() => {
			EngineStorage.deSerialize(JSON.stringify(obj));
		}).toThrow();
	});

	it("fails on missing id", () => {
		const obj = {
			engineArray: [missingId],
			engineId: 2,
			defaultEngine: undefined,
		};
		expect(() => {
			EngineStorage.deSerialize(JSON.stringify(obj));
		}).toThrow();
	});

	//Invalid fields

	it("fails on invalid name", () => {
		const obj = {
			engineArray: [wrongName],
			engineId: 2,
			defaultEngine: undefined,
		};
		expect(() => {
			EngineStorage.deSerialize(JSON.stringify(obj));
		}).toThrow();
	});

	it("fails on invalid address", () => {
		const obj = {
			engineArray: [wrongAddress],
			engineId: 2,
			defaultEngine: undefined,
		};
		expect(() => {
			EngineStorage.deSerialize(JSON.stringify(obj));
		}).toThrow();
	});

	it("fails on invalid Port start", () => {
		const obj = {
			engineArray: [wrongPortStart1],
			engineId: 2,
			defaultEngine: undefined,
		};
		expect(() => {
			EngineStorage.deSerialize(JSON.stringify(obj));
		}).toThrow();
	});

	it("fails on invalid port start", () => {
		const obj = {
			engineArray: [wrongPortStart2],
			engineId: 2,
			defaultEngine: undefined,
		};
		expect(() => {
			EngineStorage.deSerialize(JSON.stringify(obj));
		}).toThrow();
	});

	it("fails on invalid port end", () => {
		const obj = {
			engineArray: [wrongPortEnd1],
			engineId: 2,
			defaultEngine: undefined,
		};
		expect(() => {
			EngineStorage.deSerialize(JSON.stringify(obj));
		}).toThrow();
	});

	it("fails on invalid port end", () => {
		const obj = {
			engineArray: [wrongPortEnd2],
			engineId: 2,
			defaultEngine: undefined,
		};
		expect(() => {
			EngineStorage.deSerialize(JSON.stringify(obj));
		}).toThrow();
	});

	it("fails on invalid id", () => {
		const obj = {
			engineArray: [wrongId],
			engineId: 2,
			defaultEngine: undefined,
		};
		expect(() => {
			EngineStorage.deSerialize(JSON.stringify(obj));
		}).toThrow();
	});

	//Invalid engine creation calls

	it("fails on wrong function input", () => {
		expect(() => {
			EngineStorage.createEngine("", "123.123.123.213", 2, 4, false);
		}).toThrow();
		expect(() => {
			EngineStorage.createEngine("a", "1234.123.123.213", 2, 4, false);
		}).toThrow();
		expect(() => {
			EngineStorage.createEngine("a", "123.123.123.213", -1, 4, false);
		}).toThrow();
		expect(() => {
			EngineStorage.createEngine(
				"a",
				"123.123.123.213",
				5555555,
				4,
				false,
			);
		}).toThrow();
		expect(() => {
			EngineStorage.createEngine("a", "123.123.123.213", 2, 1, false);
		}).toThrow();
		expect(() => {
			EngineStorage.createEngine(
				"a",
				"123.123.123.213",
				2,
				555555,
				false,
			);
		}).toThrow();
	});

	it("fails on deleting engine", () => {
		expect(() => {
			EngineStorage.deleteEngine(1);
		}).toThrow();
	});

	it("fails on wrong function input", () => {
		expect(() => {
			EngineStorage.createEngine("", "123.123.123.213", 2, 4, false);
		}).toThrow();
		expect(() => {
			EngineStorage.createEngine("a", "1234.123.123.213", 2, 4, false);
		}).toThrow();
		expect(() => {
			EngineStorage.createEngine("a", "123.123.123.213", -1, 4, false);
		}).toThrow();
		expect(() => {
			EngineStorage.createEngine(
				"a",
				"123.123.123.213",
				5555555,
				4,
				false,
			);
		}).toThrow();
		expect(() => {
			EngineStorage.createEngine("a", "123.123.123.213", 2, 1, false);
		}).toThrow();
		expect(() => {
			EngineStorage.createEngine(
				"a",
				"123.123.123.213",
				2,
				555555,
				false,
			);
		}).toThrow();
	});

	it("fails on setting default engine", () => {
		expect(() => {
			EngineStorage.defaultEngine = {
				name: "test",
				address: "123.123.123.123",
				portRangeStart: 5,
				portRangeEnd: 5,
				id: 1,
				useBundle: false,
			} as Engine;
		}).toThrow();
	});

	it("fails on getting engine", () => {
		expect(() => {
			EngineStorage.getEngine(69);
		}).toThrow();
		expect(() => {
			EngineStorage.getEngine("coolName");
		}).toThrow();
	});
});

/*******************************\
 *           DATA              * 
\*******************************/

const missingName = {
	//name: "test",
	address: "123.123.123.123",
	portRangeStart: 5,
	portRangeEnd: 5,
	id: 1,
	useBundle: false,
};

const missingAddress = {
	name: "test",
	//address: "123.123.123.123",
	portRangeStart: 5,
	portRangeEnd: 5,
	id: 1,
	useBundle: false,
};

const missingPortStart = {
	name: "test",
	address: "123.123.123.123",
	//portRangeStart: 5,
	portRangeEnd: 5,
	id: 1,
	useBundle: false,
};

const missingPortEnd = {
	name: "test",
	address: "123.123.123.123",
	portRangeStart: 5,
	//portRangeEnd: 5,
	id: 1,
	useBundle: false,
};

const missingId = {
	name: "test",
	address: "123.123.123.123",
	portRangeStart: 5,
	portRangeEnd: 5,
	//id: 1,
	useBundle: false,
};

const wrongName = {
	name: "",
	address: "123.123.123.123",
	portRangeStart: 5,
	portRangeEnd: 5,
	id: 1,
	useBundle: false,
};

const wrongAddress = {
	name: "test",
	address: "123.123.1235.123",
	portRangeStart: 5,
	portRangeEnd: 5,
	id: 1,
	useBundle: false,
};

const wrongPortStart1 = {
	name: "test",
	address: "123.123.123.123",
	portRangeStart: -1,
	portRangeEnd: 5,
	id: 1,
	useBundle: false,
};
const wrongPortStart2 = {
	name: "test",
	address: "123.123.123.123",
	portRangeStart: 65355,
	portRangeEnd: 5,
	id: 1,
	useBundle: false,
};
const wrongPortEnd1 = {
	name: "test",
	address: "123.123.123.123",
	portRangeStart: 1,
	portRangeEnd: 65555,
	id: 1,
	useBundle: false,
};
const wrongPortEnd2 = {
	name: "test",
	address: "123.123.123.123",
	portRangeStart: 10,
	portRangeEnd: 5,
	id: 1,
	useBundle: false,
};

const wrongId = {
	name: "test",
	address: "123.123.123.123",
	portRangeStart: 1,
	portRangeEnd: 5,
	id: -5,
	useBundle: false,
};
