import {
	toSnakeCase,
	type Services,
	type WithIp,
	type Writeable,
} from "../communication";

export async function communicationTauri<
	S extends keyof Services,
	E extends keyof Services[S],
>(
	service: S,
	endpoint: E,
	input: WithIp<Writeable<Awaited<ReturnType<Services[S][E]>["request"]>>>,
): Awaited<ReturnType<Services[S][E]>["response"]> {
	const { invoke } = await import("@tauri-apps/api");
	const serviceSnake = toSnakeCase(service);
	const endpointSnake = toSnakeCase(endpoint);

	return await invoke(`${serviceSnake}_${endpointSnake}`, { payload: input });
}
