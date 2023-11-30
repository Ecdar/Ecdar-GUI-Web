import {
	toSnakeCase,
	type Service,
	type Endpoint,
	type Input,
	type Output,
} from "../communication";

/**
 * Calls Ecdar web on /service/endpoint
 * */
export async function communicationWeb<
	S extends keyof Service,
	E extends keyof Endpoint<S>,
>(service: S, endpoint: E, input: Input<S, E>): Promise<Output<S, E>> {
	const serviceSnake = toSnakeCase(service);
	const endpointSnake = toSnakeCase(endpoint);
	const headers = new Headers();
	headers.set("Content-Type", "application/json");
	const response = await fetch(`${serviceSnake}/${endpointSnake}`, {
		method: "POST",
		headers: headers,
		body: JSON.stringify(input),
	});

	if (response.status != 200) {
		throw new Error("communication failed with code: " + response.status);
	}

	return response.json() as Promise<Output<S, E>>;
}
