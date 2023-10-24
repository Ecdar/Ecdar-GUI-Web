import { Features } from "../features/Features";
import type { CommunicationFeatures } from "./CommunicationFeatures";

export class Communication {
	static start(): Communication {
		return new Communication();
	}
	end(): void {}
	readonly features: Features<CommunicationFeatures> = new Features({});
}
