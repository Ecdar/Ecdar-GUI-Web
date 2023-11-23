import axios from "axios";
import { toSnakeCase, type Services, type WithIp, type Writeable } from "../communication";

export async function communicationWeb<
	S extends keyof Services,
	E extends keyof Services[S],
>(
	service: S,
	endpoint: E,
	input: WithIp<Writeable<Awaited<ReturnType<Services[S][E]>["request"]>>>,
): Awaited<ReturnType<Services[S][E]>["response"]> {
	const servicePascal = toSnakeCase(service);
	const endpointPascal = toSnakeCase(endpoint);
	const response = await axios.post(
		`${servicePascal}/${endpointPascal}`,
		input,
	);

	if (response.status != 200) {
		throw new Error("communication failed with code: " + response.status);
	}

	return response.data as Promise<ReturnType<typeof communicationWeb<S, E>>>;
}

