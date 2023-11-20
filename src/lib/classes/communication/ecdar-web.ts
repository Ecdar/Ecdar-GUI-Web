import axios from "axios";
import type { Services, WithIp, Writeable } from "../communication";

export async function communicationWeb<
	S extends keyof Services,
	E extends keyof Services[S],
>(
	service: S,
	endpoint: E,
	input: WithIp<Writeable<Awaited<ReturnType<Services[S][E]>["request"]>>>,
): Awaited<ReturnType<Services[S][E]>["response"]> {
	const servicePascal = toPascal(service);
	const endpointPascal = toPascal(endpoint);
	const response = await axios.post(
		`${servicePascal}/${endpointPascal}`,
		input,
	);

	if (response.status != 200) {
		throw new Error("communication failed with code: " + response.status);
	}

	return response.data as Promise<ReturnType<typeof communicationWeb<S, E>>>;
}

function toPascal(input : string) : string {
  return input[0].toUpperCase() + input.substring(1);
}

