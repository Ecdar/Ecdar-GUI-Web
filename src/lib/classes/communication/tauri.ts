import {
	toSnakeCase,
	type Service,
	type Endpoint,
	type Output,
	type Input,
} from "../communication";

/**
 * Calls a gRPC bacend through tauri
 * */
export async function communicationTauri<
	S extends keyof Service,
	E extends keyof Endpoint<S>,
>(service: S, endpoint: E, input: Input<S, E>): Promise<Output<S, E>> {
	const { invoke } = await import("@tauri-apps/api");
	const serviceSnake = toSnakeCase(service);
	const endpointSnake = toSnakeCase(endpoint);

	return (await invoke(`${serviceSnake}_${endpointSnake}`, {
		payload: input,
	})) as Promise<Output<S, E>>;
}
