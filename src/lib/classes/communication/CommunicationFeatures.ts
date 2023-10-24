export type CommunicationFeatures = {
	getUserToken?: () => Promise<void>;
	sendQuery?: () => Promise<void>;
	startSimulation?: () => Promise<void>;
	takeSimulationStep?: () => Promise<void>;
	test?: (t1: string, t2: string, t3: number) => [string, number];
};
