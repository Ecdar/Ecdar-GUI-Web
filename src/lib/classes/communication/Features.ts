export type Features = {
	getUserToken?: () => Promise<void>;
	sendQuery?: () => Promise<void>;
	startSimulation?: () => Promise<void>;
	takeSimulationStep?: () => Promise<void>;
};
