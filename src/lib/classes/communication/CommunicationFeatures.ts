import { FeatureError } from "../features/FeatureError";

export class CommunicationFeatures {
	getUserToken;
	sendQuery;
	startSimulation;
	takeSimulationStep;

	constructor(
		getUserToken : () => void = () => { throw new Error(FeatureError.NotImplemented) },
		sendQuery: () => void = () => { throw new Error(FeatureError.NotImplemented) },
		startSimulation: () => void = () => { throw new Error(FeatureError.NotImplemented) },
		takeSimulationStep: () => void = () => { throw new Error(FeatureError.NotImplemented) },
	) {
		this.getUserToken = getUserToken;
		this.sendQuery = sendQuery;
		this.startSimulation = startSimulation;
		this.takeSimulationStep = takeSimulationStep;
	}
};
